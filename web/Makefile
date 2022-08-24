#
# Copyright (c) 2022 Intel Corporation 
#
# SPDX-License-Identifier: Apache-2.0
 
# See README.md for details about this Makefile.


########################################
# Make Configuration 
########################################
MAKEFLAGS += --warn-undefined-variables --no-builtin-rules
TRACE ?= 0
ifeq ($(TRACE),1)
.SHELLFLAGS = -xc
endif

.DELETE_ON_ERROR:
.NOTPARALLEL:
.PHONY: default docker image \
		install lint audit test serve build \
		clean clean-image clean-node clean-all

########################################
# Default target and common aliases. 
########################################
default docker: image
serve: serve-development
SERVER_TARGETS=development production zh

########################################
# Development server configuration. 
########################################
PUBLIC_PORT = 4200
PUBLIC_HOST = 127.0.0.1
ALLOWED_HOSTS = '["127.0.0.1"]'

########################################
# `ng` and `npm` command targets.
########################################
ANGULAR_TARGETS = test e2e lint extract-i18n
NPM_TARGETS = audit
build_args ?=
run_args ?=
tool_args ?= 

test: karma.conf.js
test: cmd_args += --code-coverage --watch false --browsers ChromeHeadlessNoSandbox
extract-i18n: cmd_args += --output-path=locale



########################################
# Docker image targets 
########################################
# Configuration for the Docker image.
# This probably doesn't need to strictly align with all EdgeX conventions,
# since the image is only used as a means to an end (`dist/`) or for local development.
REPOSITORY = edgexfoundry
SERVICE_NAME = edgex-web-ui
IMAGE_NAME = $(REPOSITORY)/$(SERVICE_NAME)
VERSION_FILE = ./VERSION
VERSION = $(shell cat $(VERSION_FILE) 2>/dev/null || echo 0.0.0)
GIT_SHA = $(shell git rev-parse HEAD)

# If this is running as uid 0, choose a different id.
# The various uses of chown in this Makefile are present to ensure we still work in CI.
USER_ID = $(shell if [ "0" -eq "$$(id -u)" ]; then echo "1000" ; else id -u ; fi)
GROUP_ID = $(shell if [ "0" -eq "$$(id -g)" ]; then echo "1000" ; else id -g ; fi)
user:
	@echo "$(USER_ID):$(GROUP_ID)"

# Build a Docker image used by other targets/for development.
#
# The (phony) image target depends on a sentinel file to track whether the image is built. 
# That sentinel has an order-only dependency on a target that removes the sentinel file
# if it turns out the Docker image has been removed, ensuring it'll be rebuilt if needed.
# Note that this image intentionally does not depend upon the actual source files.
IMAGE_SENTINEL = $(SERVICE_NAME).imagebuilt
image: $(IMAGE_SENTINEL)
$(IMAGE_SENTINEL): Dockerfile $(VERSION_FILE) | $(SERVICE_NAME).image-check
	docker build \
		-f Dockerfile \
		--build-arg USER=$(USER_ID) \
		$(build_args) \
		--label "git_sha=$(GIT_SHA)" \
		-t $(IMAGE_NAME):$(GIT_SHA) \
		-t $(IMAGE_NAME):$(VERSION)-dev \
		.
	touch $@

# Delete the image sentinel if the Docker image was removed.
$(SERVICE_NAME).image-check:
	$(call run_image_check,$(IMAGE_SENTINEL),$(IMAGE_NAME))

# Enforce that a version file exists so we don't rebuild the image unnecessarily. 
# This should be removed if the `$(VERSION)-dev` tag is removed from the image. 
$(VERSION_FILE):
	@echo -e "$(yellow)warning: generating $(VERSION_FILE)$(clear)"
	echo "0.0.0" > $@



########################################
# Build/test/development targets 
########################################
# Source files are everything under ./src + all *.json in the current directory.
SRC_FILES = $(shell find . -path './src/*' -type f -print \
				-o -path './*/*' -prune \
				-o -name '*.json' -print) 

# Start a dev server in a container. 
#
# This runs Angular's local development server with hot reloading enabled,
# so you edit the files locally and see the changes right away.
.PHONY: $(SERVER_TARGETS:%=serve-%)
$(SERVER_TARGET:%=serve-%): serve-%: run_args += -p "$(PUBLIC_PORT):80"
$(SERVER_TARGETS:%=serve-%): serve-%: node_modules | image
	$(RUN) \
		ng serve \
			--configuration $* \
			--hmr \
			--host 0.0.0.0 \
			--port 80 \
			--public-host="$(PUBLIC_HOST):$(PUBLIC_PORT)" \
			--allowed-hosts=$(ALLOWED_HOSTS)

# Build the production version of the site.
build: dist/web/
dist/web/: $(SRC_FILES) node_modules | image
	mkdir -p dist/web/
	chown "$(USER_ID):$(GROUP_ID)" dist/web/
	$(RUN) ng build --configuration production

# Install dependencies.
install node_modules: package.json package-lock.json | image
	mkdir -p node_modules coverage
	chown "$(USER_ID):$(GROUP_ID)" node_modules coverage package-lock.json
	$(RUN) npm install

# Run Angular CLI or npm commands in a container.
.PHONY: $(ANGULAR_TARGETS) $(NPM_TARGETS)
$(ANGULAR_TARGETS): node_modules | image
	$(RUN) ng $@ $(cmd_args)
$(NPM_TARGETS): node_modules | image
	$(RUN) npm $@ $(cmd_args) 


########################################
# Cleanup 
########################################
# Remove production build output.
clean:
	rm -rf dist coverage

# Remove dependencies.
clean-node:
	rm -rf node_modules 

# Remove Docker images.
clean-image:
	$(call remove_docker_images,$(IMAGE_NAME))
	rm -f $(IMAGE_SENTINEL)

clean-all: clean clean-node clean-image


########################################
# Makefile Helpers 
########################################
# Colors.
red = $(shell tput setaf 1)
green = $(shell tput setaf 2)
yellow = $(shell tput setaf 3)
cyan = $(shell tput setaf 6)
clear = $(shell tput sgr0)

# Usage: $(RUN) CMD [ARGS...] 
#
# Run a command in a temporary container using the image built by `make image`.
# This bind-mounts the local directory to /app and uses the current user's uid & gid,
# so this is used in targets like build, test, serve, etc. to facilitate local development 
# while running the actual server within an isolated container environment.
#
# You can pass additional docker run arguments by setting run_args.
# 
# The tty check is so we don't attempt to attach a tty when one doesn't exist.
# Although "-s" _should_ prevent output when there's no TTY,
# at least on Jenkins we get the ever helpful "ignoring all arguments",
# so we redirect the output to /dev/null anyway.
RUN = docker run --rm -i \
		$(shell if tty -s 2>/dev/null >/dev/null ; then printf -- "-t" ; fi) \
		-v "$$(pwd):/app" \
		-u "$(USER_ID):$(GROUP_ID)" \
		$(run_args) \
		$(IMAGE_NAME):$(VERSION)-dev

# Usage: $(call run_image_check,SENTINEL,IMAGE)
#
# Check if some image named IMAGE exists (with any tag suffix),
# or delete and remake the SENTINEL target if it does not.
define run_image_check = 
$(if $(and 
	$(wildcard $1),\
	$(if $(shell docker images -q $2),,missing)),\
@echo -e "$(red)image $2 does not exist -- will recreate$(clear)"
rm -f $1
+$(MAKE) --always-make $1,\
)
endef

# Usage: $(call remove_docker_images,IMAGE)
#
# Remove all docker images matching IMAGE.
define remove_docker_images =
@echo -e "$(cyan)Deleting docker images for $1...$(clear)"
@if [ ! -z "$$(docker image ls -q $1)" ]; then \
	docker image ls -q $1 | xargs docker rmi -f; \
else \
	echo -e "$(yellow)No images for matching $1$(clear)"; \
fi
endef


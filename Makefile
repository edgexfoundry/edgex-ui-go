#
# Copyright (c) 2018 Tencent
#
# SPDX-License-Identifier: Apache-2.0
#

.PHONY: build clean run docker \
		test test-angular test-go \
		web

GO=CGO_ENABLED=0 GO111MODULE=on go
GOCGO=CGO_ENABLED=1 GO111MODULE=on go

MICROSERVICES=cmd/edgex-ui-server/edgex-ui-server
.PHONY: $(MICROSERVICES)

DOCKERS=docker_edgex_ui_go
.PHONY: $(DOCKERS)

VERSION=$(shell cat ./VERSION 2>/dev/null || echo 0.0.0)

GOFLAGS=-ldflags "-X github.com/edgexfoundry/edgex-ui-go.Version=$(VERSION)"

GIT_SHA=$(shell git rev-parse HEAD)

build: $(MICROSERVICES)
	$(GO) build ./...

tidy:
	go mod tidy

cmd/edgex-ui-server/edgex-ui-server:
	$(GO) build $(GOFLAGS) -o $@ ./cmd/edgex-ui-server

clean:
	rm -f $(MICROSERVICES)

test-go:
	$(GO) test -coverprofile=coverage.out ./...
	$(GO) vet ./...
	gofmt -l $$(find . -type f -name '*.go'| grep -v "/vendor/")
	[ "`gofmt -l $$(find . -type f -name '*.go'| grep -v "/vendor/")`" = "" ]
	./bin/test-attribution-txt.sh

test-angular:
	$(MAKE) -C web test

test: test-go test-angular

# The sub-make only rebuilds web if needed, so this should be fast,
# but if copying isn't cheap enough, we could tell Make the dependencies.
web:
	$(MAKE) -C web build
	rm -rf cmd/edgex-ui-server/static/web
	cp -R web/dist/web cmd/edgex-ui-server/static/web

prepare:

update:
	$(GO) mod download

run:
	cd bin && ./edgex-ui-go-launch.sh

docker: $(DOCKERS)

docker_edgex_ui_go:
	docker build --label "git_sha=$(GIT_SHA)" \
	-t edgexfoundry/edgex-ui:$(GIT_SHA) \
	-t edgexfoundry/edgex-ui:$(VERSION)-dev \
	.

vendor:
	$(GO) mod vendor

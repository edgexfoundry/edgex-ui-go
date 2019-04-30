#
# Copyright (c) 2018 Tencent
#
# SPDX-License-Identifier: Apache-2.0
#

.PHONY: build clean test run docker

GO=CGO_ENABLED=0 GO111MODULE=on go
GOCGO=CGO_ENABLED=1 GO111MODULE=on go

MICROSERVICES=cmd/edgex-ui-server/edgex-ui-server
.PHONY: $(MICROSERVICES)

DOCKERS=docker_edgex_ui_go
.PHONY: $(DOCKERS)

VERSION=$(shell cat ./VERSION)

GOFLAGS=-ldflags "-X github.com/edgexfoundry/edgex-ui-go.Version=$(VERSION)"

GIT_SHA=$(shell git rev-parse HEAD)

build: $(MICROSERVICES)
	$(GO) build ./...

cmd/edgex-ui-server/edgex-ui-server:
	$(GO) build $(GOFLAGS) -o $@ ./cmd/edgex-ui-server

clean:
	rm -f $(MICROSERVICES)

test:
	GO111MODULE=on go test -cover ./...
	GO111MODULE=on go vet ./...

prepare:

run:
	cd bin && ./edgex-ui-go-launch.sh

docker: $(DOCKERS)

docker_edgex_ui_go:
	docker build --label "git_sha=$(GIT_SHA)" -t edgexfoundry/docker-edgex-ui-go:$(VERSION) .

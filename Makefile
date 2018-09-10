#
# Copyright (c) 2018 Tencent
#
# SPDX-License-Identifier: Apache-2.0
#

.PHONY: build clean test run

GO=CGO_ENABLED=0 go
GOCGO=CGO_ENABLED=1 go

MICROSERVICES=cmd/edgex-ui-go/edgex-ui-go
.PHONY: $(MICROSERVICES)

VERSION=$(shell cat ./VERSION)

GOFLAGS=-ldflags "-X github.com/edgexfoundry-holding/edgex-ui-go.Version=$(VERSION)"

GIT_SHA=$(shell git rev-parse --short HEAD)

build: $(MICROSERVICES)
	go build ./...

cmd/edgex-ui-go/edgex-ui-go:
	$(GO) build $(GOFLAGS) -o $@ ./cmd/edgex-ui-go

clean:
	rm -f $(MICROSERVICES)

test:
	go test -cover ./...
	go vet ./...

prepare:
	glide install

run:
	cd bin && ./edgex-ui-go-launch.sh
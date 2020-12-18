#
# Copyright (c) 2018-2020 VMWare, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

ARG BASE=golang:1.15-alpine3.12
FROM ${BASE} AS builder

ARG MAKE="make cmd/edgex-ui-server/edgex-ui-server"
ARG ALPINE_PKG_BASE="make git"
ARG ALPINE_PKG_EXTRA=""

LABEL Name=edgex-ui-go

LABEL license='SPDX-License-Identifier: Apache-2.0' \
  copyright='Copyright (c) 2018-2020: Intel'


RUN sed -e 's/dl-cdn[.]alpinelinux.org/nl.alpinelinux.org/g' -i~ /etc/apk/repositories

RUN apk add --update --no-cache ${ALPINE_PKG_BASE} ${ALPINE_PKG_EXTRA}

ENV GO111MODULE=on
WORKDIR /go/src/github.com/edgexfoundry/edgex-ui-go


COPY go.mod .
COPY Makefile .

RUN make update

COPY . .
RUN ${MAKE}

FROM alpine:3.12

EXPOSE 4000

COPY --from=builder /go/src/github.com/edgexfoundry/edgex-ui-go/cmd/edgex-ui-server /go/src/github.com/edgexfoundry/edgex-ui-go/cmd/edgex-ui-server

WORKDIR /go/src/github.com/edgexfoundry/edgex-ui-go/cmd/edgex-ui-server

ENTRYPOINT ["./edgex-ui-server","-conf=res/docker/configuration.toml"]

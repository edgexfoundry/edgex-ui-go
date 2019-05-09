FROM golang:1.11-alpine AS builder
MAINTAINER huaqiao zhang <huaqiaoz@vmware.com>

WORKDIR /go/src/github.com/edgexfoundry/edgex-ui-go

RUN cp /etc/apk/repositories /etc/apk/repositories.bak
RUN echo "https://mirrors.ustc.edu.cn/alpine/v3.6/main" > /etc/apk/repositories
RUN echo "https://mirrors.ustc.edu.cn/alpine/v3.6/community" >> /etc/apk/repositories
RUN cat /etc/apk/repositories

RUN apk update && apk add git make

COPY . .

RUN make prepare
RUN make cmd/edgex-ui-server/edgex-ui-server

FROM alpine:3.6

EXPOSE 4000

COPY --from=builder /go/src/github.com/edgexfoundry/edgex-ui-go/cmd/edgex-ui-server /go/src/github.com/edgexfoundry/edgex-ui-go/cmd/edgex-ui-server

WORKDIR /go/src/github.com/edgexfoundry/edgex-ui-go/cmd/edgex-ui-server

ENTRYPOINT ["./edgex-ui-server"]

FROM golang:1.9-alpine AS builder
MAINTAINER huaqiao zhang <huaqiaoz@vmware.com>

RUN cp /etc/apk/repositories /etc/apk/repositories.bak
RUN echo "https://mirrors.ustc.edu.cn/alpine/v3.6/main" > /etc/apk/repositories
RUN echo "https://mirrors.ustc.edu.cn/alpine/v3.6/community" >> /etc/apk/repositories
RUN cat /etc/apk/repositories

RUN apk update && apk add git
RUN apk update && apk add make

COPY github.com /go/src/github.com/
WORKDIR /go/src/github.com/edgexfoundry-holding/edgex-ui-go/cmd/edgex-ui-go/
RUN GOOS=linux go build

FROM alpine:3.6

EXPOSE 4000

COPY --from=builder /go/src/github.com/edgexfoundry-holding/edgex-ui-go/ /go/src/github.com/edgexfoundry-holding/edgex-ui-go/

WORKDIR /go/src/github.com/edgexfoundry-holding/edgex-ui-go/cmd/edgex-ui-go

ENTRYPOINT ["./edgex-ui-go"]

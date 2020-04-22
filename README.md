# edgex-ui-go
[![Go Report Card](https://goreportcard.com/badge/github.com/edgexfoundry/edgex-ui-go)](https://goreportcard.com/report/github.com/edgexfoundry/edgex-ui-go) [![license](https://img.shields.io/badge/license-Apache%20v2.0-blue.svg)](LICENSE)

EdgeX UI is an implementation of [EdgeX API](https://github.com/edgexfoundry/edgex-go/tree/master/api) on the page,It is provided as an easy way to use EdgeX.

<p align="center">
  <img src ="assets/images/export.png" />
</p>

## Get Started

[EdgeX UI  Video Demo](https://www.youtube.com/watch?v=2EOHR_gUeic&t=570s)

- First you need to make sure that EdgeX containers are already running, Please refer to [Edgex Services Get Started](https://github.com/edgexfoundry/edgex-go/blob/master/README.md). After you complete the start of the edgex containers, the UI will also be started by default.

- With a modern browser, navigate to http://yourdomain:4000 (change *yourdomain* to your server's hostname or ip). 

**Note** Before you log in for the first time, you need to create a user.

## Install and Deploy

To fetch the code and compile the web-based UI:

Using `go get`:
```
go get github.com/edgexfoundry/edgex-ui-go
cd $GOPATH/src/github.com/edgexfoundry/edgex-ui-go
make build
```

Using Git:
```
cd $GOPATH/src
git clone http://github.com/edgexfoundry/edgex-ui-go.git github.com/edgexfoundry/edgex-ui-go
cd $GOPATH/src/github.com/edgexfoundry/edgex-ui-go
make build
```

To start the application and the web-based UI:

```
make run
```

To rebuild after making changes to source:

```
make clean
make build
```

To test the web-based UI:

```
make test
```
To start all the EdgeX Go microservices in Docker, run the following command in the root of the EdgeX Go directory:

```
make run_docker
```

For more information and detailed instructions on using EdgeX, please reference [the main EdgeX documentation.](https://nexus.edgexfoundry.org/content/sites/docs/staging/master/docs/_build/html/#)

## Community
- Chat: https://chat.edgexfoundry.org/home
- Mainling lists: https://lists.edgexfoundry.org/mailman/listinfo
- [EdgeX Chinese Club](https://www.edgexfoundry.club/)

## License
[Apache-2.0](LICENSE)

## Feedback

- If you find a bug or want to request a new feature, please open a [GitHub Issue](https://github.com/edgexfoundry/edgex-ui-go/issues).

- Have a online chat at the appointed time on the [zoom](https://VMware.zoom.us/j/3697467292).

  **Note** Please contact to us before you want to have a online chat.
# edgex-ui-go
[![Go Report Card](https://goreportcard.com/badge/github.com/edgexfoundry-holding/edgex-ui-go)](https://goreportcard.com/report/github.com/edgexfoundry-holding/edgex-ui-go) [![license](https://img.shields.io/badge/license-Apache%20v2.0-blue.svg)](LICENSE)
> Go implementation of EdgeX Web UI.

<p align="center">
  <img src ="assets/images/edgex-ui-go-overview.png" />
</p>

Effect picture after refactoring frontend ui (to be done):

<p align="center">
  <img src ="assets/images/gentelella-overview.jpeg" />
</p>

## Install and Deploy

To fetch the code and compile the web ui:

```
go get github.com/edgexfoundry-holding/edgex-ui-go
cd $GOPATH/src/github.com/edgexfoundry-holding/edgex-ui-go
glide install
make build
```

To rebuild if you changed the source code :

```
make clean
make build
```

To test the web ui :

```
make test
```

To run the web ui :

```
make run
```

## Community
- Chat: https://chat.edgexfoundry.org/home
- Mainling lists: https://lists.edgexfoundry.org/mailman/listinfo

## License
[Apache-2.0](LICENSE)
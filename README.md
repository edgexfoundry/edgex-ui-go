# edgex-ui-go
> Go implementation of EdgeX Web UI.

[![Go Report Card](https://goreportcard.com/badge/github.com/edgexfoundry/edgex-ui-go)](https://goreportcard.com/report/github.com/edgexfoundry/edgex-ui-go) [![license](https://img.shields.io/badge/license-Apache%20v2.0-blue.svg)](LICENSE)



<p align="center">
  <img src ="assets/images/export.png" />
</p>

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

With a modern browser, navigate to http://yourdomain:4000 (change *yourdomain* to your server's hostname or ip). 
> NOTE: make sure that EdgeXFoundry is already running, Please refer to [Edgex Services Get Started](https://github.com/edgexfoundry/edgex-go/blob/master/README.md). 


## Community
- EdgeXFoundry Chinese Club: https://www.edgexfoundry.club
- Chat: https://chat.edgexfoundry.org/home
- Mainling lists: https://lists.edgexfoundry.org/mailman/listinfo

## License
[Apache-2.0](LICENSE)

## Feedback

- If you want to learn how to use the UI, you can refer to the user guide [user guide](https://github.com/edgexfoundry/edgex-ui-go/blob/master/docs/UseGuide.md).

- If you find a bug or want to request a new feature, please open a [GitHub Issue](https://github.com/edgexfoundry/edgex-ui-go/issues).

- Have a online chat at the appointed time on the [zoom](https://VMware.zoom.us/j/3697467292).

  **Note** Please contact to us before you want to have a online chat.

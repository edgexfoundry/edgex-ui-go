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

To fetch the code and compile the web-based UI:

Using `go get`:
```
go get github.com/edgexfoundry-holding/edgex-ui-go
cd $GOPATH/src/github.com/edgexfoundry-holding/edgex-ui-go
glide install
make build
```

Using Git:
```
cd $GOPATH/src
git clone http://github.com/edgexfoundry-holding/edgex-ui-go.git github.com/edgexfoundry-holding/edgex-ui-go
cd $GOPATH/src/github.com/edgexfoundry-holding/edgex-ui-go
glide install
make build
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

Before starting the web-based UI for the first time, you'll need to initialize the Mongo database and ensure that the settings are pointing to your MongoDB instance.
Without Mongo, the project defaults to using an in-memory database.

To initialize Mongo from the root of the project directory:

```
mongo deployments/initmongo.js
```

Mongo settings can be found under `web/app/repository/mongo/mongo.go`.

To start the application and the web-based UI:

```
make run
```

## Using the application

### Logging in

With a modern browser, navigate to http://localhost:4000.
The default user credentials are:

```
Username     : admin
Password : admin
```

## Displaying EdgeX Go Microservices Data on the UI

> prepare : make sure you have installed Docker and its stable version.

### Starting EdgeX with Docker

To start all the EdgeX Go microservices in Docker, run the following command in the root of the EdgeX Go directory:

```
make run_docker
```

For more information and detailed instructions on using EdgeX, please reference [the main EdgeX documentation.](https://nexus.edgexfoundry.org/content/sites/docs/staging/master/docs/_build/html/#)

## Community
- Chat: https://chat.edgexfoundry.org/home
- Mainling lists: https://lists.edgexfoundry.org/mailman/listinfo

## License
[Apache-2.0](LICENSE)

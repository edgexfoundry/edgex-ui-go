# EdgeX UI Snap
[![snap store badge](https://raw.githubusercontent.com/snapcore/snap-store-badges/master/EN/%5BEN%5D-snap-store-black-uneditable.png)](https://snapcraft.io/edgex-ui)

This folder contains snap packaging for the EdgeX UI Snap.

The project maintains a rolling release of the snap on the `edge` channel that is rebuilt and published at least once daily.

The snap currently supports the following architectures: `amd64`, `arm64`.

## Installation

### Installing snapd

The snap can be installed on any system that supports snaps. You can see how to install snaps on your system [here](https://snapcraft.io/docs/installing-snapd).

However for full security confinement, the snap should be installed on an 
Ubuntu 18.04 LTS or later (Desktop or Server), or a system running Ubuntu Core 18 or later.

### Installing EdgeX UI as a snap
The snap is published in the snap store at https://snapcraft.io/edgex-ui.
You can see the current revisions available for your machine's architecture by running the command:

```bash
$ sudo snap info edgex-ui
```

The latest development version of the edgex-ui snap can be installed using:

```bash
$ sudo snap install edgex-ui --edge
```

**Note** - in general, installing from the edge channel is only recommended for development purposes. 

**Note** - the snap has only been tested on Ubuntu Desktop.

### Install and configure edgexfoundry as a snap

The latest development version of the edgexfoundry snap can be installed using:

```
$ sudo snap remove --purge edgexfoundry
$ sudo snap install edgexfoundry --edge
```

**WARNING** - don't install the edgexfoundry snap on a system that is already running one of the included services (e.g. Consul, Redis, Vault, ...), as this may result in resource conflicts (i.e. ports) which could cause the snap install to fail.

After these steps, edgex-ui snap and edgexfoundry snap will automatically be running.

##### Check services

```bash
$ sudo snap services
```

we should see:

```
Service                                    Startup   Current   Notes
edgex-ui.edgex-ui                          enabled   active    -
edgexfoundry.app-service-configurable      disabled  inactive  -
edgexfoundry.consul                        enabled   active    -
edgexfoundry.core-command                  enabled   active    -
edgexfoundry.core-data                     enabled   active    -
edgexfoundry.core-metadata                 enabled   active    -
edgexfoundry.device-virtual                disabled  inactive  -
edgexfoundry.kong-daemon                   enabled   active    -
edgexfoundry.kuiper                        disabled  inactive  -
edgexfoundry.postgres                      enabled   active    -
edgexfoundry.redis                         enabled   active    -
edgexfoundry.security-bootstrapper-redis   enabled   inactive  -
edgexfoundry.security-consul-bootstrapper  enabled   inactive  -
edgexfoundry.security-proxy-setup          enabled   inactive  -
edgexfoundry.security-secretstore-setup    enabled   inactive  -
edgexfoundry.support-notifications         disabled  inactive  -
edgexfoundry.support-scheduler             disabled  inactive  -
edgexfoundry.sys-mgmt-agent                disabled  inactive  -
edgexfoundry.vault                         enabled   active    -
```

##### Configure edgexfoundry

Enable scheduler, to use Interval and interval actions for cleaning up Redis database periodically:

```bash
$ sudo snap set edgexfoundry support-scheduler=on 
$ sudo snap set edgexfoundry support-notifications=on 
```

Enable system management agent service for communication between SMA and core data, to use ‘system services monitor’ for system health check, metric check, configuration and operation:

```bash
$ sudo snap set edgexfoundry sys-mgmt-agent=on
```

Enable rules engine, to create streams and sinks:

```bash
$ sudo snap set edgexfoundry kuiper=onbash
```

Learn more of using edgexfoundry snap, please see: https://github.com/edgexfoundry/edgex-go/blob/main/snap/README.md

### JWT token

API Gateway is needed to enter UI secure mode. Before the API Gateway can be used, a user and group must be created, and a JWT access token generated. This can be accomplished via the `secrets-config` command, or by using `snap set` commands.

The first step is to add a user. You need to create a public/private keypair, which can be done with:

Create private key;

Create public key;

```
$ openssl ecparam -genkey -name prime256v1 -noout -out private.pem
$ openssl ec -in private.pem -pubout -out public.pem
```

If you then create the user using the secrets-config command, then you need to provide

- The username
- The public key
- (optionally) ID. This is a unique string identifying the credential. It will be required in the next step to create the JWT token. If you don't specify it, then an auto-generated one will be output by the secrets-config command

do this using `snap set`:

set user=username,user id,algorithm (ES256 or RS256);

set public-key to the contents of a PEM-encoded public key file;

```bash
$ sudo snap set edgexfoundry env.security-proxy.user=user01,USER_ID,ES256
$ sudo snap set edgexfoundry env.security-proxy.public-key="$(cat public.pem)"
```

The second step is then to generate a token using the user ID which you specified:

```bash
$ edgexfoundry.secrets-config proxy jwt --algorithm ES256 --private_key private.pem --id USER_ID --expiration=1h
```

A output has a long alphanumeric sequence of the format < alphanumeric >.< alphanumeric >.< alphanumeric >:

```
eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJVU0VSX0lEIiwiZXhwIjoxNjM1OTM1NjYxLCJuYmYiOjE2MzU5MzIwNjEsImlhdCI6MTYzNTkzMjA2MX0.Kzsu_3L7wVNbjAbGfNatmyVtsmDaodOG_b5nCHKywU327xdfqpgno1g3ai1yu8hz6pG0_2eHnordCSWxaPFoMA
```

This output is the JWT token for login UI secure mode. This token will be asked again if you exit the web page, and re-enter it. Please write the token you generated down in case you re-enter the UI web page. The needed token can not be generated for the second time.

### Using the edgex-ui snap

Open this in your browser: [http://localhost:4000](http://localhost:4000/):

![image-20211103095314904](/home/mengyi/snap/typora/42/.config/Typora/typora-user-images/image-20211103095314904.png)

Please use the JWT token we generated above to log in, then here is the UI homepage:

![image-20211103103956597](/home/mengyi/snap/typora/42/.config/Typora/typora-user-images/image-20211103103956597.png)

**Note** - please give names inside UI better with CamelCase, but not with blank space. Blank space will have problems when using REST API

For more detail on how to use each section of the UI, please see: https://docs.edgexfoundry.org/2.1/getting-started/tools/Ch-GUI/#general

##### Snap configuration

The service can then be started as follows. The "--enable" option
ensures that as well as starting the service now, it will be automatically started on boot:

```bash
$ sudo snap start --enable edgex-ui.edgex-ui
```

The service can then be stopped as follows. The "--disable" option
ensures that as well as stopping the service now, it will be automatically stopped on boot:

```bash
$ sudo snap stop --disable edgex-ui.edgex-ui
```

##### Viewing logs

To view the logs for the service in the edgex-ui snap use:

```
$ sudo snap logs edgex-ui.edgex-ui
```


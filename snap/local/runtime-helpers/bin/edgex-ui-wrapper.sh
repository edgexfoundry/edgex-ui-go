#!/bin/bash -e

# go into the $SNAP_DATA folder before executing the server because it doesn't
# currently allow specifying a different location for the configuration file,
# and as such we want to use the writable version of the config file in 
# $SNAP_DATA 
# also see https://github.com/edgexfoundry/edgex-ui-go/issues/111 for more 
# details and upstream issue status
cd "$SNAP_DATA/config/edgex-ui-server"

exec "$SNAP/bin/edgex-ui-server"

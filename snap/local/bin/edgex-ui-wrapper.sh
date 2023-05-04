#!/bin/bash -e

# Change to $SNAP directory because the application loads static files relative
#   to the working directory
cd $SNAP
exec ./bin/edgex-ui-server --configDir $SNAP_DATA/config/edgex-ui-server/res

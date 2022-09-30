#!/bin/bash -e

cd "$SNAP"
exec ./bin/edgex-ui-server --confdir "$SNAP_DATA/config/edgex-ui-server/res"

#!/bin/bash -e

cd "$SNAP"
exec ./bin/edgex-ui-server --conf "$SNAP_DATA/config/edgex-ui-server/res/configuration.toml"

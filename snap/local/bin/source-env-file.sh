#!/bin/bash -e

# convert cmdline to string array
ARGV=($@)

# grab binary path
BINPATH="${ARGV[0]}"

SERVICE="edgex-ui"
SERVICE_ENV="$SNAP_DATA/config/$SERVICE/res/$SERVICE.env"
TAG="edgex-$SERVICE."$(basename "$0")

if [ -f "$SERVICE_ENV" ]; then
    logger --tag=$TAG "sourcing $SERVICE_ENV"
    set -o allexport
    source "$SERVICE_ENV" set
    set +o allexport 
fi

exec "$@"

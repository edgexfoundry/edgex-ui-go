#!/bin/bash -e

SERVICE="edgex-ui"
ENV_FILE="$SNAP_DATA/config/$SERVICE/overrides.env"
TAG="edgex-$SERVICE."$(basename "$0")

if [ -f "$ENV_FILE" ]; then
    logger --tag=$TAG "sourcing $ENV_FILE"
    set -o allexport
    source "$ENV_FILE" set
    set +o allexport 
else
    logger --tag=$TAG "$ENV_FILE not found!"
fi

exec "$@"

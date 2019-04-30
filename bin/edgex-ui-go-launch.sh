#!/bin/bash
#
# Copyright (c) 2018
# Tencent
#
# SPDX-License-Identifier: Apache-2.0
#

DIR=$PWD
CMD=../cmd/edgex-ui-server

# Kill all edgex-ui-go* stuff
function cleanup {
	pkill edgex-ui-go
}

cd $CMD
exec -a edgex-ui-server ./edgex-ui-server &
cd $DIR

trap cleanup EXIT

while : ; do sleep 1 ; done

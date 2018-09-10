#!/bin/bash
#
# Copyright (c) 2018
# Tencent
#
# SPDX-License-Identifier: Apache-2.0
#

DIR=$PWD
CMD=../cmd

# Kill all edgex-ui-go* stuff
function cleanup {
	pkill edgex-ui-go
}

cd $CMD/edgex-ui-go
exec -a edgex-ui-go ./edgex-ui-go &
cd $DIR

trap cleanup EXIT

while : ; do sleep 1 ; done
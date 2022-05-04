# EdgeX UI Snap
[![edgex-ui](https://snapcraft.io/edgex-ui/badge.svg)][edgex-ui]

This directory contains the snap packaging of the EdgeX UI.

The snap is built automatically and published on the Snap Store as [edgex-ui].

For usage instructions, please refer to EdgeX UI section in [Getting Started using Snaps][docs].

## Build from source
Execute the following command from the top-level directory of this repo:
```
snapcraft
```

This will create a snap package file with `.snap` extension. It can be installed locally by setting the `--dangerous` flag:
```bash
sudo snap install --dangerous <snap-file>
```

The [snapcraft overview](https://snapcraft.io/docs/snapcraft-overview) provides additional details.

[edgex-ui]: https://snapcraft.io/edgex-ui
[docs]: https://docs.edgexfoundry.org/2.2/getting-started/Ch-GettingStartedSnapUsers/#edgex-ui

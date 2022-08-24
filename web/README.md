# Web
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.4.

You can [use a local angluar install](#Using-a-Local-Angular-Install),
or use the included Makefile to [develop using Docker](#Develop-Using-Docker).

## Using a Local Angular Install
### Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.
The app will automatically reload if you change any of the source files.

### Code scaffolding
Run `ng generate component component-name` to generate a new component.
You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
Use the `--prod` flag for a production build.

### Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
This Makefile provides targets for developers to test, serve, and build the web UI
using Docker for isolation while still permitting local development tooling.
This enables e.g. IDE integration while providing a straight-forward CI path.

## Develop Using Docker
The included Makefile provides targets for developers to test, serve, and build the web UI
using Docker for isolation while still permitting local development tooling.
This enables e.g. IDE integration while providing a straight-forward CI path.

The test and build targets should work out-of-the-box (provided you have `make` and `docker`),
though the development targets require a little configuration to handle network connections.

### Quick Start

#### For unit testing and production builds
- Run `make test` for tests
- Run `make build` to generate a production build.
- Remove the existing `../cmd/edgex-web-ui/static/web/` directory
  and replace it with the newly generated `dist/web/` directory.

#### For local development
- Build and run the API server from the root directory.
- Edit `proxy.conf.json` and set the address to your machine's IP
  or the IP of the machine running the API server.
  This should **NOT** be `localhost` or `127.0.0.1`,
  but **MUST** be reachable (e.g., `curl <that IP>` should succeed).
- Run `make serve` and wait for the build to finish.
- Navigate to `http://localhost:4200/`
  If it's stuck loading and the CLI shows an error saying it can't reach the API server,
  check your `proxy.conf.json` configuration.

### Details
The basic premise is this: there's an `image` target which builds a Docker image
containing node and some relevant test dependencies.
Other targets start a container from that image, running with the user's `uid`/`gid`.
The local directory is bind-mounted in, so changes transfer both ways/with the correct permissions.

Most targets depend on `node_modules`, which starts a container and runs `npm install`.
That'll download the dependencies, and they'll show up in the local directory,
meaning they're available to all other targets that start a container this way.

There are various targets which simply start a container and run an `ng` or `npm` command:
- `make audit` runs `npm audit`
- `make lint` runs `ng lint`
- `make e2e` runs `ng e2e`
- `make test` runs `ng test --code-coverage --watch false --browsers ChromeHeadlessNoSandbox`
- `make serve` runs `ng serve` with development settings (use `make --dry-run` for specifics)
- `make serve-production` runs `ng serve` with production settings

You can add new targets by modifying the `Makefile`'s `ANGULAR_TARGETS` and `NPM_TARGETS`.
Where necessary, targets add target-specific dependencies and arguments to control them:
- `build_args` are passed to Docker when building the image.
- `run_args` are passed to Docker when running a command in a container.
- `tool_args` are appended to the command when running a command in a container.

### Developer Server
The `serve` target runs Angular's development server.
Note that this server needs to be able to contact the API server,
which (from the container's perspective) is running on a different host,
so you won't be able to use the loopback address (`localhost` or `127.0.0.1`);
instead, modify `proxy.conf.json` to point to your host machine's IP
or the IP address of where the server is running.

If you want to run the API server in its own Docker container,
you'll need to modify the `serve-%` target to attach it to the same network,
then configure the `proxy.conf.json` with API server's container name.

#### Configure Access
Since access to the server is handled through Docker (i.e. `iptables`),
we need to tell Docker what port to expose and Angular what IPs are acceptable.

Set the `PUBLIC_HOST` and `PUBLIC_PORT` variables to the IP and port you'll connect from.
This config works fine for most local development, but if you have a strange VM setup
or if you just want to be able to reach the server from other networked machines,
add their IPs to the list of `ALLOWED_HOSTS` (note that it must be JSON stringified).
These are just passed directly to `ng serve`, so see Angular's docs for more info.


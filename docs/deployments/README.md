# deploy component

> This documentation describe the components which edgex-ui-go may depend on.

## MongoDB

> MongoDB is one of the databases supported by edgex-ui-go.

To install mongodb (for Mac OS x):

    brew install mongodb

> make sure the HomeBrew is installed before

To start mongodb (for Mac OS x):

    brew services start mongodb

> default port is : 27017

To init mongodb with seed data:

    mongo deployments/initmongo.js

> make sure the MongoDB has been started before
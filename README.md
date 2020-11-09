# Service Engine: General Service Engine: `REST`, `GraphQL` & `gRPC`

This project implements the [**service-engine**](https://www.npmjs.com/package/service-engine) npm package to provide `REST`, `GraphQL`, & `gRPC` services.

Currently it only supports postgres, mysql and sqlite3. Support is planned for the remaining dialects support by knex.

#  <a id="table-of-contents"></a>Table of Contents

* [Table of Contents](#table-of-contents)
* [Run via Docker](#run_via_docker)
* [Run via Node](#run_via_node)
* [OpenAPI UI](#open_api_ui)
* [API Documentation](#api_documentation)
* [Migrations](#migrations)
* [Static HTML Documentation](#static_html)
    * [Generate shin markdown](#generate_shin)
    * [Disable Migrations](#disable_migrations)
* [Docker Image Publishing](#docker_image)
* [Versioning](#versioning)
* [License](#license)

# <a id="run_via_docker"></a>Run via Docker

set secrets & metadata

```
docker run \
	--rm -it \
	--env-file ./env \
	-v $(pwd)/lib/metadata.json:/app/lib/metadata.json \
	-v $(pwd)/lib/metadata.json:/app/lib/metadata.json \    
	-v $(pwd)/lib/complex_resources.js:/app/lib/complex_resources.js \
	-v $(pwd)/lib/migrations:/app/migrations \
	--network mynetwork \
	-p 8080:8080 \
	-p 50012:50012 \
	--name myservice \
	sudowing/service-engine:master
```

The service should now be available:
 - http://localhost:8080/openapi
 - http://localhost:8080/service-engine-app/graphql/

##### Docker Networking Notes:
DB_HOST should be ip, domain or docker container name. If container name ensure db and this service on same network.
`--network` docker flag only needed if DB is run by docker as both need to be on same networks. If available outside docker -- you can omit.


# <a id="run_via_node"></a>Run via Node

Set secrets in `.env` and then run application.

```
npm run start
```

The service should now be available:
 - http://localhost:8080/openapi
 - http://localhost:8080/service-engine-app/graphql/

# <a id="open_api_ui"></a>OpenAPI UI
```
npm run api-docs
```

The OpenAPI-UI should now be available:
 - http://localhost:8088/

# <a id="api_documentation"></a>API Documentation

I use the [Insomnia API Client](https://insomnia.rest) for develoment, and I've included an export of some general service calls to speed your development. 

The service has a two sets of resources -- some static development resources to the framework (ping, openapi, etc) and others that are generated dynamically that are specific to the database. I've prebuilt an Insomnia collection that describes the development resource calls, which you can import [docs/insomnia.service.json](./docs/insomnia.service.json)

##### **NOTE 1:** I like Postman but use Insomniafor it's better GraphQL support

# <a id="migrations"></a>Migrations
Knex is used for migration management by `service-engine`.

Instead of exposing all the knex migration interfaces (since this project is also baked into a general docker container) migrations are added by placing new migration files into the `migrations` directory.

Migration Usage follows this workflow:
- copy/paste `migrations/knex.stub.template` to `migrations/YYYYMMDDHHMMSS_some_migration_name.js` 
- add the migration steps to the `exports.up` & `exports.down` functions (exactly as you would with knex).
- Migrations get executed on server start

# <a id="static_html"></a>Static HTML Documentation

This project includes support for generating the markdown consumed by [Shin Docs](https://github.com/Mermade/shins) needed to produce static html documents. If you haven't seen that project before, it's worth a look.

## <a id="generate_shin"></a>Generate shin markdown

```
npm run make:api-md
```

The `npm` cmd above will generate the api [documentation in markdown](./docs/service.md).

You can take this output and use it to produce fantastic static HTML docs with [Mermade/shins](https://github.com/Mermade/shins). I always use the `--inline` flag.


## <a id="disable_migrations"></a>Disable Migrations

To disable migrations, which run by default when the server starts, you can simply disable it via an `ENV VAR`.

```
MIGRATIONS=false
```

# <a id="docker_image"></a>Docker Image Publishing

The steps below are not unique to this project -- but I often have to lookup the steps -- so I'll document them here for convenience.
```
# build docker container
docker build -t sudowing/service-engine:develop -f .Dockerfile .

# tag & push master
docker tag sudowing/service-engine:develop sudowing/service-engine:master
docker push sudowing/service-engine:master

# tag & push latest
docker tag sudowing/service-engine:develop sudowing/service-engine:latest
docker push sudowing/service-engine:latest

# tag & push v0.0.0
docker tag sudowing/service-engine:develop sudowing/service-engine:v0.0.0
docker push sudowing/service-engine:v0.0.0
```


# <a id="versioning"></a>Versioning

[SemVer](http://semver.org/) is used for versioning. For the versions available, see the [tags on this repository](https://github.com/sudowing/service-engine/tags). 

# <a id="license"></a>License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

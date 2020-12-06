# Service Engine: General Service Engine: `REST`, `GraphQL` & `gRPC`

This project implements the [**service-engine**](https://www.npmjs.com/package/service-engine) npm package to provide `REST`, `GraphQL`, & `gRPC` services.

Currently it only supports postgres, mysql and sqlite3. Support is planned for the remaining dialects support by knex.

#  <a id="table-of-contents"></a>Table of Contents

* [Table of Contents](#table-of-contents)
* [Run via Docker](#run_via_docker)
* [Run via Node](#run_via_node)
* [OpenAPI UI](#open_api_ui)
* [API Documentation](#api_documentation)
* [Schema Migrations](#schema_migrations)
	* [Basic Schema Migrations](#schema_migrations-basic)
	* [Disable Migrations on Startup](#schema_migrations-disable-on-startup)
	* [Modular Schema Migration Scripts](#schema_migrations-modular)
	* [SQL Style Guide](#schema_migrations-styleguide)
* [Static HTML Documentation](#static_html)
    * [Generate shin markdown](#generate_shin)
    * [Disable Migrations](#disable_migrations)
* [Docker Image Publishing](#docker_image)
* [Versioning](#versioning)
* [License](#license)

# <a id="run_via_docker"></a>Run via Docker

set secrets & metadata

```sh
# create docker network (if db on docker network)
docker network create mynetwork

# run app via docker, optionally mounting custom files
docker run \
	--rm -it \
	-v $(pwd)/lib/metadata.json:/app/lib/metadata.json \
	-v $(pwd)/lib/middleware.json:/app/lib/middleware.json \
	-v $(pwd)/lib/redactions.js:/app/lib/redactions.js \
	-v $(pwd)/lib/complex_resources.js:/app/lib/complex_resources.js \
	-v $(pwd)/lib/permissions.json:/app/lib/permissions.json \
	-v $(pwd)/migrations:/app/migrations \
	--network mynetwork \
	--env-file ./env \
	-p 8080:8080 \
	-p 50012:50012 \
	--name myservice \
	sudowing/service-engine:master
```

The service should now be available:
 - http://localhost:8080/openapi
 - http://localhost:8080/service-engine-app/graphql/

##### **NOTES:**
- **GraphQL Playground:** To access the Web UI, set `NODE_ENV=production`.
- **Networking:** `DB_HOST` should be ip, domain or docker container name. If container name ensure db and this service on same network.
`--network` docker flag only needed if DB is run by docker as both need to be on same networks. If available outside docker -- you can omit.


# <a id="run_via_node"></a>Run via Node

Set secrets in `.env` and then run application.

```sh
npm run start
```

The service should now be available:
 - http://localhost:8080/openapi
 - http://localhost:8080/service-engine-app/graphql/

# <a id="open_api_ui"></a>OpenAPI UI
```sh
# launch the openapi ui via a docker container
npm run api-docs
```

The OpenAPI-UI should now be available:
 - http://localhost:8088/

# <a id="api_documentation"></a>API Documentation

I use the [Insomnia API Client](https://insomnia.rest) for develoment, and I've included an export of some general service calls to speed your development. 

The service has a two sets of resources -- some static development resources to the framework (ping, openapi, etc) and others that are generated dynamically that are specific to the database. I've prebuilt an Insomnia collection that describes the development resource calls, which you can import [docs/insomnia.service.json](./docs/insomnia.service.json)


Insomnia also has a feature that builds out REST calls based on an OpenAPI Specification -- which is great because the application automatically generates one based upon the database powering it.

Below is the default `/openapi` URL:
```
http://localhost:8080/openapi
```

##### **NOTE 1:** I like Postman but use Insomnia for it's better GraphQL support

# <a id="schema_migrations"></a>Schema Migrations
Knex is used for migration management by `service-engine`.

## <a id="schema_migrations-basic"></a>Basic Schema Migrations

All migration functionality provided by [knex.js](http://knexjs.org/) is supported. However, because the knexfile is not in the default location, `NPM` scripts have been added to simplify usage.

```sh
# create new knex migration script
npm run migrate:make some_script_name

# run all pending migration scripts
npm run migrate:latest

# rollback all migration scripts committing in last batch
npm run migrate:rollback

# rollback all migration scripts
npm run migrate:rollback-all

# run next pending migration script
npm run migrate:up

# uncommit last committed migration script
npm run migrate:down

# list all migration script along with commitment status
npm run migrate:list
```

## <a id="schema_migrations-disable-on-startup"></a>Disable Migrations on Startup

To disable migrations, which run by default when the server starts, you can simply disable it via an `ENV VAR`.

```
MIGRATIONS=false
```

## <a id="schema_migrations-modular"></a>Modular Schema Migration Scripts

Instead of wrapping SQL inside JS template strings within the up/down functions for knex, I prefer to commit the `SQL` directly. To support this bias, I've included support for a simple system that creates modular directories that correspond with a given migration script.

The best way to explain how the system works is with an example. 


### Create New Migration Scripts
```sh
# create new migration scripts via custom functionality
npm run migrate:new atlanta braves
npm run migrate:new philadelphia phillies
```

### Migration Directory Contents

The two `NPM` commands above will generate the files diagrammed with the tree below. Descriptions for key directories follow the diagram.
```
.
├── 20201129005348_0001_atlanta_braves.js
├── 20201129005518_0002_philadelphia_phillies.js
├── sql
│   ├── 0001
│   │   ├── down
│   │   │   ├── 01_drop_another_table.sql
│   │   │   └── 02_drop_some_table.sql
│   │   └── up
│   │       ├── 01_create_some_table.sql
│   │       └── 02_create_another_table.sql
│   └── 0002
│       ├── down
│       │   ├── 01_drop_another_table.sql
│       │   └── 02_drop_some_table.sql
│       └── up
│           ├── 01_create_some_table.sql
│           └── 02_create_another_table.sql
└── template
    ├── down
    │   ├── 01_drop_another_table.sql
    │   └── 02_drop_some_table.sql
    └── up
        ├── 01_create_some_table.sql
        └── 02_create_another_table.sql

10 directories, 14 files
```

- #### **file:** `201129005518_0002_philadelphia_phillies.js`
	This is the js file used by knex to execute the schema migration. The *integer* following the timestamp prefix within the filename corresponds with a directory use to hold batches of `SQL` files that makeup the migration.

- #### **directory:** `sql/0002/up`
	This directory will hold the batch of `SQL` files that will be applied with the migration is rolled forward. They will be executed in the order they get sorted in, so it is recommended to use integer prefixes.

- #### **directory:** `sql/0002/down`
	This directory will hold the batch of `SQL` files that will be applied with the migration is rolled backwards. They will be executed in the order they get sorted in, so it is recommended to use integer prefixes.

- #### **directory:** `template`
	This directory is used as the basis for creating `sql/{id}` directories. Anything present in these directories will get cloned when using the `npm run migrate:new` command.

## <a id="schema_migrations-styleguide"></a>SQL Style Guide

A SQL styleguide is included within the migrations directory. It is a simple markdown file, which you should modify to fit your needs. I forked the guide from [GitLab Handbook](https://about.gitlab.com/handbook/business-ops/data-team/platform/sql-style-guide/) which is a fantastic resources for organizational standards.

# <a id="static_html"></a>Static HTML Documentation

This project includes support for generating the markdown consumed by [Shin Docs](https://github.com/Mermade/shins) needed to produce static html documents. If you haven't seen that project before, it's worth a look.

## <a id="generate_shin"></a>Generate shin markdown

```sh
npm run make:api-md
```

The `npm` cmd above will generate the api [documentation in markdown](./docs/service.md).

You can take this output and use it to produce fantastic static HTML docs with [Mermade/shins](https://github.com/Mermade/shins).

##### note: I always use the `--inline` flag when generating the shin docs.

# <a id="docker_image"></a>Docker Image Publishing

The steps below are not unique to this project -- but I often have to lookup the steps -- so I'll document them here for convenience.

```sh
# build docker container
docker build -t sudowing/service-engine:develop -f .Dockerfile .

# tag & push latest
docker tag sudowing/service-engine:develop sudowing/service-engine:latest
docker push sudowing/service-engine:latest

# tag & push v1.3.0
docker tag sudowing/service-engine:develop sudowing/service-engine:1.3.0
docker tag sudowing/service-engine:develop sudowing/service-engine:1.3
docker tag sudowing/service-engine:develop sudowing/service-engine:1
docker push sudowing/service-engine:1.3.0
docker push sudowing/service-engine:1.3
docker push sudowing/service-engine:1
```

# <a id="versioning"></a>Versioning

[SemVer](http://semver.org/) is used for versioning. For the versions available, see the [tags on this repository](https://github.com/sudowing/service-engine-docker/tags). 

# <a id="license"></a>License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

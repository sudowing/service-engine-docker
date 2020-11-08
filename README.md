# service-engine-docker

#### Dockerized Service-Engine Service.

#### This project implements the [`service-engine`](https://www.npmjs.com/package/service-engine) npm package to provide REST & GraphQL interfaces to Databases. Currently it only supports postgres -- but all database engines support by knex will soon be added.

## RUN APP

Set secrets in `.env` and then run application.

```
npm run start
```

The service should now be available:
 - http://localhost:8080/openapi
 - http://localhost:8080/service-engine-app/graphql/

## OpenAPI UI
```
npm run api-docs
```
The openapi GUI should now be available:
 - http://localhost:8088/

## Migrations
Knex is used for migration management by `service-engine`. Instead of exposing all the knex migration interfaces (since this project will soon be baked into a general docker container) migrations are added by placing new migration files into the `migrations` directory.
Simply copy/paste `migrations/knex.stub.template` to `migrations/YYYYMMDDHHMMSS_some_migration_name.js` and add the migration steps to the `exports.up` & `exports.down` functions (exactly as you would with knex).

## API Documentation

The service has a two sets of resources -- some static development resources to the framework (ping, openapi, etc) and others that are generated dynamically that are specific to the database.

I use the [`Insomnia API Client`](insomnia.rest) for develoment, and I've included an export of some general service calls to speed your development.

Once you install insomnia, you can import [`docs/insomnia.service.json`](./docs/insomnia.service.json)

## REST Search Interface Summary

Search queries in REST are get calls to the /${schema}_${table}/.

These calls support multiple query interfaces such as in, not in, like, gte, lt, etc.

A richer description will come in the future -- but review the example below to get an idea of how to call these resources. query context options start with a |.
example query (obviously -- these all become `GET` querystring params).

```
const query = {
    "alpha.gt": "field.gt",
    "bravo.gte": "field.gte",
    "charlie.lt": '42',
    "delta.lte": "111",
    "echo.not": "field.not",
    "echo.null": "field.not",
    "echo.not_null": "field.not",
    "foxtrot.range": "5.1,9.7",
    "foxtrot.not_range": "5.1,9.7",
    "golf.in": "braves,marlins,nationals,mets,phillies",
    "hotel.not_in": "braves,marlins,nationals,mets,phillies",
    "alpha.like": "field.like",
    "mike.geo_bbox": "1.1,2.2,3.3,4.4",
    "november.geo_radius": "1.2,2.3,111000",
    "mike.geo_bbox": "one, two, three, four",
    "november.geo_radius": "one, two, three",
    "|seperator": ",",
    "|fields": "alpha,bravo,charlie",
    "|orderBy": "one:desc,charlie:asc,three:desc,four",
    "|delta": "delta",
    "|echo": "echo",
};
```

## Waddershins/Shin Support

This project includes support for generating the markdown consumed by [Shin Docs](https://github.com/Mermade/shins) needed to produce static html documents. If you haven't seen that project before, it's worth a look.

The process will be to run the command below and to move the generated file `./docs/service.md` into a local version of the `shins` repo and follow the instructions there to generate the new documentation. (I always use the `--inline` flag).

### Generate shin markdown

```
npm run make:api-md
```

## Run by Docker

### set secrets & metadata
The app needs some secrets set in .env
```
DB_CLIENT=pg
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=secret
DB_DATABASE=postgres
DB_FILENAME="/path/to/db.sqlite"
# DB_SOCKETPATH="/path/to/socket.sock"
DB_POOL_MIN=3
DB_POOL_MAX=9
DB_MIGRATIONS_TABLE=knex_migrations
PAGINATION_LIMIT=100
#MIGRATIONS=false // true by default
```

### Docker Run

```
docker run \
    --rm -it \
    --network mynetwork \
    -p 8080:8080 \
    --name myservice \
    sudowing/service-engine:develop
```
#### Docker Networking Notes:
DB_HOST should be ip, domain or docker container name. If container name ensure db and this service on same network.
`--network` docker flag only needed if DB is run by docker as both need to be on same networks. If available outside docker -- you can omit.


insomnia

waddershins / openapi

.env

demo projects
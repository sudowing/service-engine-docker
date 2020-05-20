# service-engine-docker
Dockerized Service-Engine Service

## QUICK START

### create shared docker network
```
docker network create mynetwork
```

### run local DB
```
docker network create mynetwork && \
docker run \
 -d \
 -v $(pwd)/db_data:/var/lib/postgresql/data \
 --network mynetwork \
 -e POSTGRES_PASSWORD=secret \
 --name ah_db \
 -p 5432:5432 postgres
```

### Set Secrets

Set vars in `.env` (env.template provided)
```
cp env.template .env
```
### Run App
```
npm run start
```
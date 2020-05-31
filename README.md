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

current issue
two problems. problem with postgers resource query -- getting dupes
second problem -- only want READ and Mutation queries AND keysType if keys exist
      input keysPublicAssocPropertyGame {
          
      }


-- Drop table

-- DROP TABLE public.assoc_property_game;

CREATE TABLE public.assoc_property_game (
	property int4 NOT NULL,
	game int4 NOT NULL,
	CONSTRAINT assoc_property_game_pkey PRIMARY KEY (property, game)
);

ALTER TABLE public.assoc_property_game ADD CONSTRAINT fk_assoc_property_game_game FOREIGN KEY (game) REFERENCES game(id);
ALTER TABLE public.assoc_property_game ADD CONSTRAINT fk_assoc_property_game_property FOREIGN KEY (property) REFERENCES property(id);

only instance with concat key

composite key
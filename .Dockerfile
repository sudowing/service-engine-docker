FROM node:14-alpine3.12

ENV HOME=/app
ENV NODE_ENV=production
ENV LD_LIBRARY_PATH=/oracle_instantclient

WORKDIR /app

RUN cd $WORKDIR

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm i

COPY migrations migrations
COPY lib lib

COPY .env .env

CMD npm run start

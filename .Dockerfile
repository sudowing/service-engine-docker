FROM node:12

ENV HOME=/home/service-engine
ENV NODE_ENV=production

RUN useradd --user-group --create-home service-engine

USER $APP_USER
WORKDIR $HOME/app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm i

COPY migrations .
COPY lib .

CMD npm run start

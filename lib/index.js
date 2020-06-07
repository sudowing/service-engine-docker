// import { ignite } from "service-engine";


// const metadata = require("./metadata.json");

const knex = require('knex');
const knexConfig = require('../knexfile');
const ignite = require('service-engine').ignite;

console.log('**********');
console.log('oooo.{knexConfig}');
console.log(JSON.stringify({knexConfig}));
console.log('**********');

const metadata = {
  "appShortName": "some-app-service",
  "title": "Some App Service",
  "description": "Basic description of core resources.",
  "termsOfService": "http://website.io/terms/",
  "name": "Joe Wingard",
  "email": "open-source@joewingard.com",
  "url": "https://github.com/sudowing/service-engine",
  "servers": [
      "http://localhost:8080",
      "https://alpha.com",
      "https://bravo.com",
      "https://charlie.com"
  ]
};

const port = 8080;

const db = knex(knexConfig);

const main = async () => {
  await db.migrate.latest();

  const { App, logger } = await ignite({ db, metadata });

  logger.info("DB Migrations Run 🔧");

  App.listen({ port }, () => {
    logger.info({ port }, "App Started 🔥");
  });
};

main();

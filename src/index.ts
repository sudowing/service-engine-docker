import * as knex from "knex";
import { ignite } from "service-engine";

import * as knexConfig from "../knexfile";

// const metadata = require("./metadata.json");

const metadata = {
  "appShortName": "some-app-service",
  "title": "Some App Service",
  "description": "Basic description of core resources.",
  "termsOfService": "http://website.io/terms/",
  "name": "Joe Wingard",
  "email": "open-source@joewingard.com",
  "url": "https://github.com/sudowing/service-engine",
  "servers": [
      "http://localhost:3001",
      "https://alpha.com",
      "https://bravo.com",
      "https://charlie.com"
  ]
};

const port = process.env.PORT || 3001;

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

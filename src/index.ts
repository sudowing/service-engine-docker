import * as knex from "knex";
import { ignite } from "service-engine";

import * as knexConfig from "../knexfile";

const port = process.env.PORT || 8080;
const metadata = require("../metadata.json");
const db = knex(knexConfig);

const main = async () => {
  await db.migrate.latest();

  const { App, apolloServer, logger } = await ignite({ db, metadata });

  logger.info("DB Migrations Run 🔧");

  App.listen({ port }, () => {
    logger.info({ port 
    }, `🔥 REST Server ready at http://localhost:${port}/openapi`);

    logger.info(`🚀 GraphQL Server ready at http://localhost:${port}${apolloServer.graphqlPath}`);

  });
};

main();
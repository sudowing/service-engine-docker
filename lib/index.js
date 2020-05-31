const knex = require("knex");
const engine = require("service-engine");

const knexConfig = require("../knexfile");
const metadata = require("./metadata.json");
const db = knex(knexConfig);
const port = process.env.PORT || 8080;

const main = async () => {
  await db.migrate.latest();

  const { App, apolloServer, logger } = await engine.ignite({ db, metadata });

  logger.info("DB Migrations Run 🔧");

  App.listen({ port }, () => {
    logger.info({ port 
    }, `🔥 REST Server ready at http://localhost:${port}/openapi`);

    logger.info(`🚀 GraphQL Server ready at http://localhost:${port}${apolloServer.graphqlPath}`);

  });
};

main();
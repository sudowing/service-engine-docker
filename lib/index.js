const knex = require('knex');
const ignite = require('service-engine').ignite;

const knexConfig = require('./knexfile');
const metadata = require("./metadata.json");
const resourceSearchMiddleware = require('./middleware');
const port = 8080;

const migrate = !(process.env.MIGRATIONS === 'false');

const db = knex(knexConfig);

const main = async () => {

  const { App, apolloServer, logger } = await ignite({ db, metadata, resourceSearchMiddleware });

  if(migrate){
    await db.migrate.latest();
    logger.info("🔧 DB Migrations Run");
  }

  App.listen({ port }, () => {
    logger.info({ port 
    }, `🔥 REST Server ready at http://localhost:${port}/openapi`);
    logger.info(`🚀 GraphQL Server ready at http://localhost:${port}${apolloServer.graphqlPath}`);
  });
};

main();

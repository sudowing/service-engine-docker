const knex = require('knex');
const ignite = require('service-engine').ignite;

const knexConfig = require('../knexfile');
const metadata = require("./metadata.json");
const port = 8080;

const db = knex(knexConfig);

const main = async () => {
  await db.migrate.latest();

  const { App, apolloServer, logger } = await ignite({ db, metadata });

  logger.info({
    author: 'Joe Wingard',
    github: 'https://github.com/sudowing',
    linkedin: 'https://www.linkedin.com/in/joewingard/',
    keybase: 'https://keybase.io/sudowing',
  }, `🤝 Send me a note if you'd like to do some work together.`);

  logger.info("🔧 DB Migrations Run");

  App.listen({ port }, () => {
    logger.info({ port 
    }, `🔥 REST Server ready at http://localhost:${port}/openapi`);
    logger.info(`🚀 GraphQL Server ready at http://localhost:${port}${apolloServer.graphqlPath}`);
  });
};

main();

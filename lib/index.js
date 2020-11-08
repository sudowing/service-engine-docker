const knex = require("knex");
const { ignite, initPostProcessing } = require("service-engine");

const knexConfig = require("./knexfile");
const { systemPermissions, resourcePermissions } = require("./permissions");
const resourceSearchMiddleware = require("./middleware");
const metadata = require("./metadata");
const complexResources = require("./complex_resources");

const port = process.env.PORT || 3001;
const paginationLimit = process.env.PAGINATION_LIMIT;

const db = knex(initPostProcessing(knexConfig));

const main = async () => {

  await db.migrate.latest(); // if enabled!

  const { App, logger, grpcService } = await ignite({
    db, metadata, resourceSearchMiddleware, complexResources,
    systemPermissions,
    resourcePermissions,
    paginationLimit,
  });

  logger.info("DB Migrations Run 🔧");

  // run REST & GRAPHQL
  App.listen({ port }, () => {

    // run GRPC
    grpcService.start();

    logger.info({ port }, "App Started 🔥");
  });

};

try{
  main();
}
catch(err){
  console.log('err');
  console.log(err);
}

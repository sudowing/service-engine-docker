const knex = require("knex");
const { ignite, initPostProcessing } = require("service-engine");

// APP SPECIFIC DETAILS
const complexResources = require("./complex_resources");
const knexConfig = require("./knexfile");
const resourceSearchMiddleware = require("./middleware");
const metadata = require("./metadata");
const { systemPermissions, resourcePermissions } = require("./permissions");

const port = process.env.PORT || 3001;
const paginationLimit = process.env.PAGINATION_LIMIT;
const migrate = !(process.env.MIGRATIONS === 'false');


const db = knex(initPostProcessing(knexConfig));

const main = async () => {

  if(migrate){
    await db.migrate.latest();
    logger.info("🔧 DB Migrations Run");
  }
  
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

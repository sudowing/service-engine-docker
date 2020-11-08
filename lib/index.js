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
  try{
    
    if(migrate){
      // run migrations BEFORE ignite because you want db changes reflected
      await db.migrate.latest();
    }
    
    const { App, logger, grpcService } = await ignite({
      db, metadata, resourceSearchMiddleware, complexResources,
      systemPermissions,
      resourcePermissions,
      paginationLimit,
    });

    if(migrate){
      logger.info("DB Migrations Run 🔧");
    }

    // run REST & GRAPHQL
    App.listen({ port }, () => {

      // run GRPC
      grpcService.start();

      logger.info({ port }, "App Started 🔥");
      logger.info(`REST & GraphQL service available on port ${port} 🛠`)
      logger.info('gRPC service available on port 50051 🤖')
    });

  }
  catch(err){
    console.log(err, "STARTUP FAILED");
    process.exit(1);
  }

};

main();

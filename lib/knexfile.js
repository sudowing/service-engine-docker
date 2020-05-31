require('dotenv').config();
 
module.exports = {
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  pool: {
    min: process.env.DB_POOL_MIN || 2,
    max: process.env.DB_POOL_MAX || 10,
  },
  migrations: {
    tableName: process.env.DB_MIGRATIONS_TABLE || 'migrations',
    stub: 'migrations/knex.stub.template',
  }
};
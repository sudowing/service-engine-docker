require('dotenv').config();
 
module.exports = {
  client: process.env.DB_CLIENT,
  connection: {
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: process.env.DB_MIGRATIONS_TABLE || 'migrations',
    stub: 'migrations/knex.stub.template',
  }
};
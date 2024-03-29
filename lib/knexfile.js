require('dotenv').config();

const migrations = {
  tableName: process.env.DB_MIGRATIONS_TABLE || 'migrations',
  stub: 'knex.stub.template',
  directory: `${__dirname}/../migrations`
}

const DEFAULT_VALUE = 'ENVIRONMENTAL VARIABLE NOT SET'

const dbConfig = {
  client: process.env.DB_CLIENT || DEFAULT_VALUE,
  connection: {
    host: process.env.DB_HOST || DEFAULT_VALUE,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : DEFAULT_VALUE,
    database: process.env.DB_DATABASE || DEFAULT_VALUE,
    user: process.env.DB_USER || DEFAULT_VALUE,
    password: process.env.DB_PASSWORD || DEFAULT_VALUE,
  },
  migrations
}

if (process.env.DB_SCHEMA) {
  dbConfig.searchPath = process.env.DB_SCHEMA;
}

if (process.env.DB_SOCKETPATH) {
  dbConfig.connection.socketPath = process.env.DB_SOCKETPATH;
  delete dbConfig.connection.host;
}

if (process.env.DB_FILENAME) {
  dbConfig.connection = { filename: process.env.DB_FILENAME };
  dbConfig.useNullAsDefault = true;
}

const withPoolSupport = ['pg', 'mysql', 'redshift'];
if (withPoolSupport.includes(dbConfig.client)) {
  dbConfig.pool = {
    min: process.env.DB_POOL_MIN ? Number(process.env.DB_POOL_MIN) : 2,
    max: process.env.DB_POOL_MAX ? Number(process.env.DB_POOL_MAX) : 10,
  };
}

if (dbConfig.client == 'oracledb') {
  dbConfig.connection.connectString = `${dbConfig.connection.host}:${dbConfig.connection.port}/${dbConfig.connection.database}`

  dbConfig.fetchAsString = [
     'date'
    // ,'number'
    ,'clob'
  ];

}

module.exports = dbConfig;
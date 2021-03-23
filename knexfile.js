require('dotenv').config();
const parse = require("pg-connection-string".parse);

let productionConn = null;
if (process.env.DATABASE_URL) {
  productionConn = parse(process.env.DATABASE_URL);
  productionConn.ssl = { rejectUnauthorized: false };
}

module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            user: process.env.DB_USER,
            password: process.env.DB_PW,
            database: process.env.DB_NAME
        },
        migrations: {
            directory: __dirname + '/db/migrations',
        },
        seeds: {
            directory: __dirname + '/db/seeds'
        },
    },
    production: {
        client: 'pg',
        connection: productionConn,
        migrations: {
            directory: __dirname + '/db/migrations',
        },
        seeds: {
            directory: __dirname + '/db/seeds'
        },
    } 
}
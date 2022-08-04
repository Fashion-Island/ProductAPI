require('dotenv').config();
const { Pool, Client } = require('pg')
// pools will use environment variables
//for connection information
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'products',
  password: 'haozhu123',
  port: 5432,
})

// const pool = new Pool({
//   user: process.env.PGUSER,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT,
// })
pool.connect();

module.exports = pool

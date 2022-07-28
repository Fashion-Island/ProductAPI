const { Pool, Client } = require('pg')
// pools will use environment variables
// for connection information
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'products',
  password: 'haozhu123',
  port: 5432,
})

pool.connect();
module.exports = pool

// clients will also use environment variables
// for connection information
// const client = new Client({
//   user: 'postgres',
//   host: 'database.server.com',
//   database: 'products',
//   password: 'haozhu123',
//   port: 5432,
// })
// await client.connect()
// const res = await client.query('SELECT NOW()')
// await client.end()
const pg = require('pg')
require('dotenv').config()
const connectionString = process.env.DATABASE_URL || 'http://dwish.cejrurnbdudk.us-west-2.rds.amazonaws.com';
const {PG_SECRET} = process.env

const client = new pg.Client({
  user: 'dwish_admin',
  host: connectionString,
  database: 'dwishDb',
  password: `${PG_SECRET}`
});

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})
// const query = client.query(
//   'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
// query.on('end', () => { client.end(); });

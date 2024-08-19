const { Pool } = require('pg');

// Configure the connection pool
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "one piece",
  database: "RH Database"
});
pool.connect()
  .then(() => console.log("connected"))
  .catch((err) => {
    console.log(err);
  });

module.exports = pool;

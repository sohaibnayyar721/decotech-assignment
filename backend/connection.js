const mySql2 = require("mysql2/promise");

let pool;

const createPool = async () => {
  if (pool) return pool;

  pool = await mySql2.createPool({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "powerhouse",
  });

  return pool;
};

const getConnectionFromPool = async () => {
  const pool = await createPool();
  try {
    const connection = await pool.getConnection();
    console.log("Sql Connected");
    return connection;
  } catch (err) {
    console.error("Error getting connection from pool:", err);
    throw err;
  }
};

module.exports = { createPool, getConnectionFromPool };

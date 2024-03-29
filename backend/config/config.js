require("dotenv").config();

const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const database = process.env.MYSQL_DATABASE;
const testDatabase = process.env.MYSQL_TEST_DATABASE;
const host = process.env.MYSQL_HOST;

const config = {
  development: {
    username,
    password,
    database,
    host,
  },
  test: {
    username,
    password,
    database: testDatabase,
    host,
  },
  production: {},
};

module.exports = config;

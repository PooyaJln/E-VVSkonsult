require("dotenv").config();

const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const database = process.env.MYSQL_DATABASE;
// const testDatabase = process.env.MYSQL_TEST_DATABASE;
const host = process.env.MYSQL_HOST;
const node_env = process.env.NODE_ENV || 'development';
const sessionSecret = process.env.SESSION_SECRET;
const serverPort = process.env.SERVER_PORT;

const config = {
  development: {
    db: {
      username,
      password,
      database,
      host,
    },
    sessionSecret,
    serverPort
  },

};

module.exports = config[node_env];

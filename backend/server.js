require("dotenv").config();
const app = require("./app");
const db = require("./models");
const config = require("./config/config")

const NODE_ENV = process.env.NODE_ENV;
const SERVER_PORT = config.serverPort;
const MYSQL_HOST = config.db.host;

try {
  (async () => {
    await db.sequelize.sync();
    console.log(
      `${db.sequelize.config.database} is synchronized successfully.`
    );
    // const app = appFnDb(db);

    app.listen(SERVER_PORT, () => {
      if (NODE_ENV == 'development') console.log(`server started. Go to http://${MYSQL_HOST}:${SERVER_PORT}/`);
      else console.log(`server started. Go to https://${MYSQL_HOST}:${SERVER_PORT}/`);
    });
  })();
} catch (error) {
  console.log(`Unable to connect to the ${config.database} database:`);
  console.error(err);
}

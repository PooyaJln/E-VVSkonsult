require("dotenv").config();
const { app, appFnDb } = require("./app");
const db = require("./models");

const SERVER_PORT = process.env.SERVER_PORT;
const NODE_ENV = process.env.NODE_ENV;
const SERVER_URI = process.env.SERVER_URI;

try {
  (async () => {
    await db.sequelize.sync();
    console.log(
      `${db.sequelize.config.database} is synchronized successfully.`
    );
    // const app = appFnDb(db);

    app.listen(SERVER_PORT, () => {
      if (NODE_ENV == 'development') console.log(`server started. Go to http://${SERVER_URI}:${SERVER_PORT}/`);
      else console.log(`server started. Go to https://${SERVER_URI}:${SERVER_PORT}/`);
    });
  })();
} catch (error) {
  console.log(`Unable to connect to the ${config.database} database:`);
  console.error(err);
}

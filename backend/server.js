require("dotenv").config();
const { pool, poolPromise, prisma } = require("./connections/dbConnection");
const { appFnDb } = require("./app");
const db = require("./models");

const SERVER_PORT = process.env.SERVER_PORT;
try {
  (async () => {
    await db.sequelize.sync();
    console.log(
      `${db.sequelize.config.database} is synchronized successfully.`
    );
    const app = appFnDb(db);

    app.listen(SERVER_PORT, () => {
      console.log(`server started. Go to http://localhost:${SERVER_PORT}/`);
    });
  })();
} catch (error) {
  console.log(`Unable to connect to the ${config.database} database:`);
  console.error(err);
}

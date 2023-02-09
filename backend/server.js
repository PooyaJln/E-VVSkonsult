require("dotenv").config();
// const { pool } = require("./connections/dbConnection");
const db = require("./models/index");
const { app, appFnDb } = require("./app");

const SERVER_PORT = process.env.SERVER_PORT;

try {
  (async () => {
    await db.sequelize.sync();
    console.log(`All models were synchronized successfully.`);
  })();
} catch (error) {
  console.error(error);
}

app.listen(SERVER_PORT, () => {
  console.log(`server started. Go to http://localhost:${SERVER_PORT}/`);
});

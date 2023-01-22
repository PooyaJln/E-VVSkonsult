require("dotenv").config();
const { pool } = require('./connections/dbConnection')
const appFuncDb = require('./app');

const app = appFuncDb(pool)


const SERVER_PORT = process.env.SERVER_PORT;
app.listen(SERVER_PORT, () => {
  console.log(`server started. Go to http://localhost:${SERVER_PORT}/`);
});


// const { appDbName } = require('./config/databasesInfo')
// const MONGO_URI = `${process.env.MONGO_URI}`;
// const appDbURI = `${MONGO_URI}${appDbName}`;
// const mongoose = require("mongoose");
// mongoose.connect(appDbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log(`connected to app database ${appDbName}`)
//     app.listen(projPort, () => {
//       console.log(`server started and listening on port ${projPort}`);
//     });
//   })
//   .catch(error => {
//     console.log(error)
//   })





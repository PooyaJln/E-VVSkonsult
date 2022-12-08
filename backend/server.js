require("dotenv").config();

const app = require('./app');
const projPort = process.env.PROJPORT;

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


app.listen(projPort, () => {
  console.log(`server started and listening on port ${projPort}`);
});


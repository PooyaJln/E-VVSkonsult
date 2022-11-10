require("dotenv").config();
// const mongoose = require("mongoose");
const app = require('./app');
const projPort = process.env.PROJPORT;

//import databses info
// const { projDbName } = require('./config/databasesInfo')

app.listen(projPort, () => {
  console.log(`server started and listening on port ${projPort}`);
});


// connect to the project database
// let projDbName = "project4";
// const MONGO_URI = `${process.env.MONGO_URI}${projDbName}`;
// console.log(MONGO_URI);
// // const MONGO_URI = process.env.MONGO_URI;
// mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     //listen for requests
//     app.listen(projPort, () => {
//       console.log(`connected to db ${projDbName} & listening on port ${projPort}`);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then((result) => app.listen(3000))
//     .catch((err) => console.log(err))
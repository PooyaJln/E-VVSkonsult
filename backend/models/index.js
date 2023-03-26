"use strict";
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
// const config = require(__dirname + "/../config/config.js")[env];

const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: "mysql",
    logging: false,
  }
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.user.hasMany(db.project, {
  foreignKey: "owner_id",
});
db.project.belongsTo(db.user, {
  foreignKey: "owner_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

//-------------------------------
db.project.hasMany(db.thermalParameter, {
  foreignKey: "project_id",
});
db.thermalParameter.belongsTo(db.project, {
  foreignKey: "project_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
//-------------------------------

db.project.hasMany(db.component, {
  foreignKey: "project_id",
});
db.component.belongsTo(db.project, {
  foreignKey: "project_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
//-------------------------------
db.project.hasMany(db.temperature, {
  foreignKey: "project_id",
});
db.temperature.belongsTo(db.project, {
  foreignKey: "project_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
//-------------------------------

db.project.hasMany(db.building, {
  foreignKey: "project_id",
});
db.building.belongsTo(db.project, {
  foreignKey: "project_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

db.building.hasMany(db.storey, {
  foreignKey: "building_id",
});
db.storey.belongsTo(db.building, {
  foreignKey: "building_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

db.storey.hasMany(db.apartment, {
  foreignKey: "storey_id",
});
db.apartment.belongsTo(db.storey, {
  foreignKey: "storey_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

db.apartment.hasMany(db.room, {
  foreignKey: "apartment_id",
});
db.room.belongsTo(db.apartment, {
  foreignKey: "apartment_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

db.temperature.hasMany(db.room, {
  foreignKey: "room_temperature",
});
db.room.belongsTo(db.temperature, {
  foreignKey: "room_temperature",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
//---------------------------------------
db.room.hasMany(db.roomBoundary, {
  foreignKey: "room1_id",
});

db.roomBoundary.belongsTo(db.room, {
  foreignKey: "room1_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

db.component.hasMany(db.roomBoundary, {
  foreignKey: "uvalue_id",
});
db.roomBoundary.belongsTo(db.component, {
  foreignKey: "uvalue_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

db.temperature.hasMany(db.roomBoundary, {
  foreignKey: "out_temp_id",
});
db.roomBoundary.belongsTo(db.temperature, {
  as: "outside_temperature",
  foreignKey: "out_temp_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

db.roomBoundary.hasMany(db.roomBoundary, {
  foreignKey: "boundary_parent_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

db.roomBoundary.belongsTo(db.roomBoundary, {
  foreignKey: "boundary_parent_id",
});
//----------------------------------------
db.thermalParameter.hasMany(db.component, {
  foreignKey: "component_qinf",
});
db.component.belongsTo(db.thermalParameter, {
  foreignKey: "component_qinf",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

try {
  (async () => {
    await sequelize.authenticate();
    console.log(
      `Connection to ${config.database} has been established successfully.`
    );
  })();
} catch (error) {
  console.log(`Unable to connect to the ${config.database} database:`);
  console.error(err);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

console.log(db);

module.exports = db;

// module.exports.db = db;

/* test database */
// const dbTest = {};
// const testENV = process.env.NODE_TEST_ENV || "test";
// console.log("testENV: ", testENV);
// const configTest = require("../config/config")[testENV];
// console.log("configTest: ", configTest);
// const sequelizeTest = new Sequelize(
//   configTest.database,
//   config.username,
//   config.password,
//   {
//     host: config.host,
//     dialect: "mysql",
//   }
// );
// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf(".") !== 0 &&
//       file !== basename &&
//       file.slice(-3) === ".js" &&
//       file.indexOf(".test.js") === -1
//     );
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(
//       sequelizeTest,
//       Sequelize.DataTypes
//     );
//     dbTest[model.name] = model;
//   });

// Object.keys(dbTest).forEach((modelName) => {
//   if (dbTest[modelName].associate) {
//     dbTest[modelName].associate(dbTest);
//   }
// });

// dbTest.sequelize = sequelizeTest;
// dbTest.Sequelize = Sequelize;

// dbTest.project.hasMany(dbTest.building, {
//   foreignKey: "project_id",
// });
// dbTest.building.belongsTo(dbTest.project);

// dbTest.building.hasMany(dbTest.storey, {
//   foreignKey: "building_id",
// });
// dbTest.storey.belongsTo(dbTest.building);

// dbTest.storey.hasMany(dbTest.apartment, {
//   foreignKey: "storey_id",
// });
// dbTest.apartment.belongsTo(dbTest.storey);

// dbTest.apartment.hasMany(dbTest.room, {
//   foreignKey: "apartment_id",
// });
// dbTest.room.belongsTo(dbTest.apartment);

// dbTest.roomBoundary.hasMany(dbTest.room, {
//   foreignKey: "room_id",
// });
// dbTest.room.belongsTo(dbTest.roomBoundary);

// sequelizeTest
//   .authenticate()
//   .then(() => {
//     console.log(
//       `Connection to ${configTest.database} has been established successfully.`
//     );
//   })
//   .catch((err) => {
//     console.error(
//       `Unable to connect to the ${configTest.database} database:`,
//       err
//     );
//   });
// module.exports.dbTest = dbTest;

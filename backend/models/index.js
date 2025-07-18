"use strict";
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");

const process = require("process");
const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || "development";
const config = require("../config/config");

const sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    dialect: "mysql",
  }
);


const db = {};


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
      DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//-------------------------------
db.user.hasMany(db.project, {
  foreignKey: "owner_id",
});
db.project.belongsTo(db.user, {
  foreignKey: "owner_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
//-------------------------------
db.user.hasOne(db.hashedPass, {
  foreignKey: "user_id",
});
db.hashedPass.belongsTo(db.project, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
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
    // console.log(
    //   `Connection to ${config.db.database} has been established successfully.`
    // );
  })();
} catch (error) {
  console.log(`Unable to connect to the ${config.db.database} database:`);
  console.error(err);
}



module.exports = db;

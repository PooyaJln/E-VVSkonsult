"use strict";
const { poolPromise, pool } = require("../connections/dbConnection");

const Building = (sequelize, DataTypes) => {
  return sequelize.define(
    "building",
    {
      building_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      building_name: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
      },
    },
    {
      tableName: "buildings",
      underscored: true,
      timestamps: false,
      paranoid: true,
    }
  );
};
module.exports = Building;

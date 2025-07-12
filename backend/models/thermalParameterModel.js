"use strict";

// const { sequelize } = require("../connections/dbConnection");
// --------------------------------- Sequelize Model
const thermalParameter = (sequelize, DataTypes) => {
  return sequelize.define(
    "thermalParameter",
    {
      parameter_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      parameter_name: {
        type: DataTypes.STRING,
        required: true,
        unique: true,
        notNull: true,
        notEmpty: true,
        allowNull: false,
      },
      parameter_value: {
        type: DataTypes.FLOAT,
        required: true,
        notNull: true,
        notEmpty: true,
        allowNull: false,
      },
      parameter_unit: DataTypes.STRING,
      project_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "thermalParameters",
      underscored: true,
      timestamps: false,
      paranoid: true,
    }
  )
};


module.exports = thermalParameter;

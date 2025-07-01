"use strict";
const { sequelize } = require("../connections/dbConnection");
const { Sequelize, DataTypes } = require("sequelize");

const Storey = (sequelize, DataTypes) => {
  return sequelize.define(

    "storey",
    {
      storey_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      storey_name: {
        type: DataTypes.STRING,
        required: true,
        notNull: true,
        notEmpty: true,
        allowNull: false,
      },
      building_id: {
        type: DataTypes.INTEGER,
        notNull: true,
        notEmpty: true,
        allowNull: false,
        required: true,
      },
    },
    {
      tableName: "stories",
      underscored: true,
      timestamps: false,
      paranoid: true,
    }
  )
};

module.exports = Storey;

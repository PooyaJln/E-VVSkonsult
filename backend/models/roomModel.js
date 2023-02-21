"use strict";
const { poolPromise, pool } = require("../connections/dbConnection");
const Errors = require("../utils/errors");
const { Sequelize, DataTypes } = require("sequelize");

const Room = (sequelize, DataTypes) => {
  return sequelize.define(
    "room",
    {
      room_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      room_name: {
        type: DataTypes.STRING,
        required: true,
        unique: true,
        notNull: true,
        notEmpty: true,
        allowNull: false,
      },
      room_temperature: {
        type: DataTypes.INTEGER,
        notNull: true,
        notEmpty: true,
        allowNull: false,
        required: true,
      },
      apartment_id: {
        type: DataTypes.INTEGER,
        notNull: true,
        notEmpty: true,
        allowNull: false,
        required: true,
      },
    },
    {
      tableName: "rooms",
      underscored: true,
      timestamps: false,
      paranoid: true,
    }
  );
};
module.exports = Room;

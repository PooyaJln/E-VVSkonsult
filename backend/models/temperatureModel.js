"use strict";
const { poolPromise, pool } = require("../connections/dbConnection");
const Errors = require("../utils/errors");
const { Sequelize, DataTypes } = require("sequelize");

// -------------------------------- Mysql Model
class Temperature_ {
  constructor(name, value) {
    this.temperature_name = name;
    this.temperature_value = value;
  }

  static async publicInfoById(id) {
    const sqlQuery = `
                    SELECT temperature_name, temperature_value
                    FROM temperatures
                    WHERE temperature_id = ?;`;
    const sqlArgum = [id];
    try {
      const [foundTemp] = await poolPromise.query(sqlQuery, sqlArgum);
      return foundTemp[0];
    } catch (error) {
      throw error;
    }
  }
  static async findById(id) {
    const sqlQuery = `
                    SELECT *
                    FROM temperatures
                    WHERE temperature_id = ?;`;
    const sqlArgum = [id];
    try {
      const [foundTemp] = await poolPromise.query(sqlQuery, sqlArgum);
      if (!foundTemp.length) {
        throw new Errors.badRequestError(
          "the requested temperature was not found"
        );
      }
      return foundTemp[0];
    } catch (error) {
      throw error;
    }
  }

  async findByName(_name) {
    const sqlQuery = `
                    SELECT *
                    FROM temperatures
                    WHERE temperature_name = ?;`;
    const sqlArgum = [_name];
    try {
      const [foundTemp] = await poolPromise.query(sqlQuery, sqlArgum);
      return foundTemp[0];
    } catch (error) {
      throw error;
    }
  }

  static async GetAll() {
    const sqlQuery = `
                    SELECT *
                    FROM temperatures;`;

    try {
      const [foundTemp] = await poolPromise.query(sqlQuery);
      return foundTemp;
    } catch (error) {
      throw error;
    }
  }

  static async publicGetAll1() {
    const sqlQuery = `SELECT ${this.name.toLowerCase()}_name, ${this.name.toLowerCase()}_value
                    FROM ${this.name.toLowerCase()}s;`;
    try {
      const [foundRow] = await poolPromise.query(sqlQuery);
      return foundRow;
    } catch (error) {
      throw error;
    }
  }
  async create() {
    try {
      let foundTemp = await this.findByName(this.temperature_name);
      if (foundTemp) {
        throw new Errors.badRequestError(
          `temperature with name ${this.temperature_name} already exists.`
        );
      }
      let sqlQuery = `
                    INSERT INTO temperatures
                    (temperature_name, temperature_value)
                    VALUES (?,?)`;
      let sqlArgum = [this.temperature_name, this.temperature_value];
      const [newTemperature] = await poolPromise.query(sqlQuery, sqlArgum);
      const id = newTemperature.insertId;
      const createdTemperature = await Temperature.publicTemperatureInfoById(
        id
      );
      return createdTemperature;
    } catch (error) {
      throw error;
    }
  }

  static async update(id, query) {
    try {
      const foundRow = await Material.findById(id);
      if (query.material_name === foundRow.material_name) {
        throw new Errors.badRequestError(
          "this name is already used for another material. Enter another name"
        );
      }
      let filteredQueryKeysArray = [];
      let sqlArgum = [];
      Object.keys(query).map((key) => {
        if (query[key] !== foundRow[key]) {
          filteredQueryKeysArray.push(key);
          sqlArgum.push(query[key]);
        }
      });
      sqlArgum.push(id);

      if (!filteredQueryKeysArray.length) {
        throw new Errors.badRequestError(
          "all the entered values are the same, enter new values to update"
        );
      }

      const setClause = filteredQueryKeysArray
        .map((item) => `${item} = ?`)
        .join(", ");
      let sqlQuery = `UPDATE ${this.name.toLowerCase()}s SET ${setClause} WHERE ${this.name.toLowerCase()}_id= ?;`;
      console.log(sqlQuery);
      console.log(sqlArgum);

      const updatedRow = await poolPromise
        .query(sqlQuery, sqlArgum)
        .then(async () => {
          return await Material.publicInfoById(id);
        })
        .catch((error) => {
          throw error;
        });
      return updatedRow;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const foundRow = await Material.findById(id);
      let sqlQuery = `
                    DELETE FROM ${this.name.toLowerCase()}s
                    WHERE ${this.name.toLowerCase()}_id = ?`;
      let sqlArgum = [id];
      const message = await poolPromise
        .query(sqlQuery, sqlArgum)
        .then(() => {
          return `the ${this.name.toLowerCase()} with name ${
            foundRow.temperature_name
          } is deleted`;
        })
        .catch((error) => {
          throw error;
        });
      return message;
    } catch (error) {
      throw error;
    }
  }
}

// --------------------------------- Sequelize Model
const Temperature = (sequelize, DataTypes) => {
  return sequelize.define(
    "temperature",
    {
      temperature_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      temperature_name: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
        unique: true,
      },
      temperature_value: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "temperatures",
      underscored: true,
      timestamps: false,
      paranoid: true,
    }
  );
};
module.exports = Temperature;

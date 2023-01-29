const { poolPromise, pool } = require("../connections/dbConnection");
const Errors = require("../utils/errors");

class Temperature {
  constructor(name, value) {
    this.temperature_name = name;
    this.temp_value = value;
  }

  static async publicTemperatureInfoById(id) {
    const sqlQuery = `
                    SELECT temperature_name, temp_value
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
  static async findTemperatureById(id) {
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

  async findTemperatureByName(_name) {
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

  static async Alltemperatures() {
    const sqlQuery = `
                    SELECT temperature_name, temp_value
                    FROM temperatures;`;

    try {
      const [foundTemp] = await poolPromise.query(sqlQuery);
      return foundTemp;
    } catch (error) {
      throw error;
    }
  }

  async create() {
    try {
      let foundTemp = await this.findTemperatureByName(this.temperature_name);
      if (foundTemp) {
        throw new Errors.badRequestError(
          `temperature with name ${this.temperature_name} already exists.`
        );
      }
      let sqlQuery = `
                    INSERT INTO temperatures
                    (temperature_name, temp_value)
                    VALUES (?,?)`;
      let sqlArgum = [this.temperature_name, this.temp_value];
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

  static async updateNameById(id, _name) {
    try {
      const foundTemp = await Temperature.findTemperatureById(id);

      if (_name === foundTemp.temperature_name) {
        throw new Errors.badRequestError(
          "the name is the same, enter a different name to update"
        );
      }
      let sqlQuery = `
                    UPDATE temperatures
                    SET temperature_name = ?
                    WHERE temperature_id = ?`;
      let sqlArgum = [_name, id];
      const updatedTemperature = await poolPromise
        .query(sqlQuery, sqlArgum)
        .then(async () => {
          return await Temperature.publicTemperatureInfoById(id);
        })
        .catch((error) => {
          throw error;
        });
      return updatedTemperature;
    } catch (error) {
      throw error;
    }
  }

  static async updateValueById(id, value) {
    try {
      const foundTemp = await Temperature.findTemperatureById(id);

      if (value == foundTemp.temp_value) {
        throw new Errors.badRequestError(
          "the value is the same, enter a different value to update"
        );
      }
      let sqlQuery = `
                    UPDATE temperatures
                    SET temp_value = ?
                    WHERE temperature_id = ?`;
      let sqlArgum = [value, id];
      const updatedTemperature = await poolPromise
        .query(sqlQuery, sqlArgum)
        .then(async () => {
          return await Temperature.publicTemperatureInfoById(id);
        })
        .catch((error) => {
          throw error;
        });
      return updatedTemperature;
    } catch (error) {
      throw error;
    }
  }

  static async updateNameValueById(id, _name, value) {
    try {
      const foundTemp = await Temperature.findTemperatureById(id);
      if (
        _name === foundTemp.temperature_name &&
        value === foundTemp.temp_value
      ) {
        throw new Errors.badRequestError(
          "the name and values are the same, enter new name or new value to update"
        );
      }
      let sqlQuery = `
                    UPDATE temperatures
                    SET temperature_name = ?, temp_value = ?
                    WHERE temperature_id = ?`;
      let sqlArgum = [_name, value, id];
      const updatedTemperature = await poolPromise
        .query(sqlQuery, sqlArgum)
        .then(async () => {
          return await Temperature.publicTemperatureInfoById(id);
        })
        .catch((error) => {
          throw error;
        });
      return updatedTemperature;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      let sqlQuery = `
                    DELETE FROM temperatures
                    WHERE temperature_id = ?`;
      let sqlArgum = [id];
      const message = await poolPromise
        .query(sqlQuery, sqlArgum)
        .then(() => {
          return `the temperature with id ${id} is deleted`;
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

/* --------------------------------------------MongoDb */
// const mongoose = require('mongoose')
// const Schema = mongoose.Schema;
// // const connection = require('../connections/dbConnection');
// // const connection = require('../connections/dbConnections');

// const temperatureSchema = new Schema({
//     Name: {
//         type: String,
//         required: true,
//     },
//     Value: {
//         type: Number,
//         required: true
//     }
// }, { timestamps: true });

// const temperatureModel = mongoose.model('temperature', temperatureSchema)
// const temperatureModel = connection.model('temperature', temperatureSchema)
// const temperatureModel = connection.appDbConnection.model('temperature', temperatureSchema)
// module.exports = temperatureSchema
module.exports = Temperature;

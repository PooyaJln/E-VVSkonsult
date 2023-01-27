const { poolPromise, pool } = require("../connections/dbConnection");
const Errors = require("../utils/errors");

class Temperature {
  constructor(name, value) {
    this.temperature_name = name;
    this.temp_value = value;
  }

  async returnPublicTemperatureInfoById(id) {
    const sqlQuery = `
                    SELECT temperature_name, temp_value
                    FROM temperatures
                    WHERE temperature_id = ?;`;
    const sqlArgum = [id];
    try {
      const [foundTemp] = await poolPromise.query(sqlQuery, sqlArgum);
      return foundTemp[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async findTemperatureById(id) {
    const sqlQuery = `
                    SELECT *
                    FROM temperatures
                    WHERE temperature_id = ?;`;
    const sqlArgum = [id];
    try {
      const [foundTemp] = await poolPromise.query(sqlQuery, sqlArgum);
      return foundTemp[0];
    } catch (error) {
      console.error(error);
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
      console.error(error);
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
      console.error(error);
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
      const createdTemperature = await this.returnPublicTemperatureInfoById(id);
      return createdTemperature;
    } catch (error) {
      throw error;
    }
  }

  async update(id, _name, value) {
    try {
      const foundTemp = await this.findTemperatureById(id);
      if (!foundTemp) {
        throw new badRequestError("the requested temperature was not found");
      }
    } catch (error) {
      console.error(error);
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

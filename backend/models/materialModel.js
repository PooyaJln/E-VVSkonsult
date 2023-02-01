const { poolPromise, pool } = require("../connections/dbConnection");
const Errors = require("../utils/errors");

class Material {
  constructor(_name, categ, value) {
    this.material_name = _name;
    this.material_uValue = value;
    this.material_categ = categ;
  }

  static async publicInfoById(id) {
    const sqlQuery = `
                    SELECT ${this.name.toLowerCase()}_name, material_uValue, material_categ
                    FROM ${this.name.toLowerCase()}s
                    WHERE ${this.name.toLowerCase()}_id = ? ;`;
    const sqlArgum = [id];
    try {
      const [foundRow] = await poolPromise.query(sqlQuery, sqlArgum);
      return foundRow[0];
    } catch (error) {
      throw error;
    }
  }
  static async findById(id) {
    const sqlQuery = `
                    SELECT *
                    FROM ${this.name.toLowerCase()}s
                    WHERE ${this.name.toLowerCase()}_id = ?;`;
    const sqlArgum = [id];
    try {
      const [foundRow] = await poolPromise.query(sqlQuery, sqlArgum);
      if (!foundRow.length) {
        throw new Errors.badRequestError(
          `the requested ${this.name.toLowerCase()} was not found`
        );
      }
      return foundRow[0];
    } catch (error) {
      throw error;
    }
  }

  static async findByName(_name) {
    const sqlQuery = `
                    SELECT *
                    FROM ${this.name.toLowerCase()}s
                    WHERE ${this.name.toLowerCase()}_name = ?;`;
    const sqlArgum = [_name];
    try {
      const [foundRow] = await poolPromise.query(sqlQuery, sqlArgum);
      return foundRow[0];
    } catch (error) {
      throw error;
    }
  }

  static async getAll() {
    const sqlQuery = `SELECT * FROM ${this.name.toLowerCase()}s;`;
    try {
      const [foundRow] = await poolPromise.query(sqlQuery);
      return foundRow;
    } catch (error) {
      throw error;
    }
  }

  static async publicGetAll() {
    const sqlQuery = `SELECT ${this.name.toLowerCase()}_name, material_uValue, material_categ
                    FROM ${this.name.toLowerCase()}s;`;
    try {
      const [foundRow] = await poolPromise.query(sqlQuery);
      return foundRow;
    } catch (error) {
      throw error;
    }
  }

  static async create(query) {
    try {
      const { material_name, material_uValue, material_categ } = query;
      let foundRow = await Material.findByName(material_name);
      if (foundRow) {
        throw new Errors.badRequestError(
          `${this.name.toLowerCase()} with name ${material_name} already exists.`
        );
      }
      let sqlQuery = `
                    INSERT INTO ${this.name.toLowerCase()}s
                    (${this.name.toLowerCase()}_name, material_uValue, material_categ)
                    VALUES (?,?,?)`;
      let sqlArgum = [material_name, material_uValue, material_categ];
      const [newRow] = await poolPromise.query(sqlQuery, sqlArgum);
      const id = newRow.insertId;
      const createdRow = await Material.publicInfoById(id);
      return createdRow;
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
                    WHERE material_id = ?`;
      let sqlArgum = [id];
      const message = await poolPromise
        .query(sqlQuery, sqlArgum)
        .then(() => {
          return `the ${this.name.toLowerCase()} with name ${
            foundRow.material_name
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
module.exports = Material;

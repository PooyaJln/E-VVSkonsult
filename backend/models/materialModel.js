const { poolPromise, pool } = require("../connections/dbConnection");
const Errors = require("../utils/errors");

class Material {
  constructor(_name, categ, value) {
    this.mtrl_name = _name;
    this.mtrl_uValue = value;
    this.mtrl_categ = categ;
  }

  static async publicInfoById(id) {
    const sqlQuery = `
                    SELECT mtrl_name, mtrl_uValue, mtrl_categ
                    FROM ${this.name.toLowerCase()}s
                    WHERE mtrl_id = ? ;`;
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
                    WHERE mtrl_id = ?;`;
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

  async findByName(_name) {
    const sqlQuery = `
                    SELECT *
                    FROM materials
                    WHERE mtrl_name = ?;`;
    const sqlArgum = [_name];
    try {
      const [foundRow] = await poolPromise.query(sqlQuery, sqlArgum);
      return foundRow[0];
    } catch (error) {
      throw error;
    }
  }

  static async allMaterials() {
    const sqlQuery = `SELECT * FROM ${this.name.toLowerCase()}s;`;
    try {
      const [foundRow] = await poolPromise.query(sqlQuery);
      return foundRow;
    } catch (error) {
      throw error;
    }
  }

  static async publicAllMaterials() {
    const sqlQuery = `SELECT mtrl_name, mtrl_uValue, mtrl_categ
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
      let foundRow = await this.findByName(this.mtrl_name);
      if (foundRow) {
        throw new Errors.badRequestError(
          `material with name ${this.mtrl_name} already exists.`
        );
      }
      let sqlQuery = `
                    INSERT INTO materials
                    (mtrl_name, mtrl_categ, mtrl_uValue)
                    VALUES (?,?,?)`;
      let sqlArgum = [this.mtrl_name, this.mtrl_uValue, this.mtrl_categ];
      const [newMaterial] = await poolPromise.query(sqlQuery, sqlArgum);
      const id = newMaterial.insertId;
      const createdMaterial = await Material.publicInfoById(id);
      return createdMaterial;
    } catch (error) {
      throw error;
    }
  }

  static async update(id, query) {
    try {
      let queryPropertyArray = Object.keys(query);
      // console.log("queryPropertyArray: ", queryPropertyArray);
      // let queryValueArray = Object.keys(query).map((item) => query[item]);
      // for (const property in query) {
      //   queryValueArray.push(query[property]);
      // }
      // console.log("queryValueArray: ", queryValueArray);
      const foundRow = await Material.findById(id);

      // defining the MySQL query string based on items in the request query
      let sqlQueryArray = queryPropertyArray.filter(
        (item) => query[item] !== foundRow[item]
      );
      if (!sqlQueryArray.length) {
        throw new Errors.badRequestError(
          "all the entered values are the same, enter new values to update"
        );
      }
      // console.log("sqlQueryArray: ", sqlQueryArray);
      let SETLine = "SET ";
      sqlQueryArray.forEach((item) => {
        if (sqlQueryArray.indexOf(item) === 0) {
          SETLine += `${item}=?`;
        } else {
          SETLine += `, ${item}=?`;
        }
      });
      let sqlQuery = `UPDATE ${this.name.toLowerCase()}s ${SETLine} WHERE mtrl_id= ?;`;
      // console.log(sqlQuery);
      // defining the MySQL query argument based on items in the request query
      let sqlArgum = [];
      sqlQueryArray.forEach((item) => {
        if (query[item] !== foundRow[item]) {
          sqlArgum.push(query[item]);
        }
      });
      sqlArgum.push(id);
      // console.log("sqlArgum: ", sqlArgum);

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
                    WHERE mtrl_id = ?`;
      let sqlArgum = [id];
      const message = await poolPromise
        .query(sqlQuery, sqlArgum)
        .then(() => {
          return `the ${this.name.toLowerCase()} with name ${
            foundRow.mtrl_name
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

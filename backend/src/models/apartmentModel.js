"use strict";
// // const { sequelize } = require("../connections/dbConnection");
const { Sequelize, DataTypes } = require("sequelize");

const Apartment = (sequelize, DataTypes) => {
  return sequelize.define(
    "apartment",
    {
      apartment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      apartment_name: {
        type: DataTypes.STRING,
        required: true,
        notNull: true,
        notEmpty: true,
        allowNull: false,
      },
      storey_id: {
        type: DataTypes.INTEGER,
        notNull: true,
        notEmpty: true,
        allowNull: false,
        required: true,
      },
    },
    {
      tableName: "apartments",
      underscored: true,
      timestamps: false,
      paranoid: true,
    }
  )
};
module.exports = Apartment;
// ---------------------------- MySQL
// const { poolPromise, pool } = require('../connections/dbConnection')
// class apartmentModel {
//     constructor(id, name, s_id, temp) {
//         // apartment_id, storey_id, apartment temperature
//         this.apartment_id = id
//         this.apartment_name = name
//         this.storey_id = s_id
//         this.apartment_temp = temp
//     }
//     async findApartmentById(id) {
//         const sqlQuery = `
//                         SELECT *
//                         FROM apartments
//                         WHERE apartment_id = ?`
//         const sqlArgum = [id]
//         try {
//             const [foundApartment] = await poolPromise.query(sqlQuery, sqlArgum)
//             if (!foundApartment.length) {
//                 throw Error('no apartment found with this id')
//             }
//             console.log("findApartmentById: ", foundApartment[0])
//             return foundStorey[0]
//         } catch (error) {
//             console.error(error)
//         }
//     }
//     static async createApartment(a_name, s_name, a_temp) {
//         try {
//             let sqlQuery = `
//                         SELECT storey_id
//                         FROM stories
//                         WHERE storey_name = ?;`
//             let sqlArgum = [s_name]
//             const [foundStorey] = await pool.query(sqlQuery, sqlArgum)
//             if (!foundStorey) {
//                 throw Error(`storey ${s_name} was not found`)
//             }
//             const storey_id = foundStorey.storey_id
//             sqlQuery = `
//                         SELECT *
//                         FROM apartments
//                         WHERE apartment_name = ?
//                         AND storey_id = ? ;`
//             sqlArgum = [a_name, storey_id]
//             const [existingApartment] = await pool.query(sqlQuery, sqlArgum)
//             if (existingApartment.length > 0) {
//                 throw Error(`apartment ${a_name} already exists. choose anther name`)
//             }
//             const [newApartment] = await poolPromise.query(`
//                                                 INSERT INTO apartments
//                                                 (apartment_name, apartment_temp, storey_id)
//                                                 VALUES(?,?)
//                                                 `, [a_name, a_temp, storey_id])

//             const id = newApartment.insertId
//             const result = await findApartmentByIdSql(id)
//         } catch (error) {
//             console.error(error)
//         }

//     }
// }

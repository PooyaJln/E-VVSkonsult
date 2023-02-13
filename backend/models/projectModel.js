"use strict";
const {
  poolPromise,
  pool,
  prisma: db,
} = require("../connections/dbConnection");

// ----------------------------------------- Sequelize
const Project = (sequelize, DataTypes) => {
  return sequelize.define(
    "project",
    {
      project_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      project_name: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
      },
      owner_id: {
        type: DataTypes.INTEGER,
        required: true,
        allowNull: false,
      },
    },
    {
      tableName: "projects",
      underscored: true,
      timestamps: false,
      paranoid: true,
    }
  );
};

module.exports = Project;

// ------------------------------------- Mysql
// class project {
//   constructor(_name, id) {
//     this.project_name = _name;
//     this.owner_id = id;
//   }

//   static async publicInfoById(id) {
//     const sqlQuery = `
//                     SELECT ${this.name.toLowerCase()}_name
//                     FROM ${this.name.toLowerCase()}s
//                     WHERE ${this.name.toLowerCase()}_id = ? ;`;
//     const sqlArgum = [id];
//     try {
//       const [foundRow] = await poolPromise.query(sqlQuery, sqlArgum);
//       return foundRow[0];
//     } catch (error) {
//       throw error;
//     }
//   }
//   static async findById(id, owner_id) {
//     const sqlQuery = `
//                     SELECT *
//                     FROM ${this.name.toLowerCase()}s
//                     WHERE owner_id = ?
//                     WHERE ${this.name.toLowerCase()}_id = ?;`;
//     const sqlArgum = [id, owner_id];
//     try {
//       const [foundRow] = await poolPromise.query(sqlQuery, sqlArgum);
//       if (!foundRow.length) {
//         throw new Errors.badRequestError(
//           `the requested ${this.name.toLowerCase()} was not found`
//         );
//       }
//       return foundRow[0];
//     } catch (error) {
//       throw error;
//     }
//   }

//   static async findByName(_name, owner_id) {
//     const sqlQuery = `
//                     SELECT *
//                     FROM ${this.name.toLowerCase()}s
//                     WHERE ${this.name.toLowerCase()}_name = ?;`;
//     const sqlArgum = [_name, owner_id];
//     try {
//       const [foundRow] = await poolPromise.query(sqlQuery, sqlArgum);
//       return foundRow[0];
//     } catch (error) {
//       throw error;
//     }
//   }

//   static async getAll(id) {
//     try {
//       // const sqlQuery = `SELECT ${this.name.toLowerCase()}_name
//       //                   FROM ${this.name.toLowerCase()}s
//       //                   WHERE owner_id =?;`;
//       // const sqlArgum = [id];
//       // const [foundRow] = await poolPromise.query(sqlQuery, sqlArgum);
//       const [foundRow] = await db.projects.findMany({
//         where: {
//           owner_id: id,
//         },
//       });
//       return foundRow;
//     } catch (error) {
//       throw error;
//     }
//   }

//   static async publicGetAll(id) {
//     try {
//       // const sqlQuery = `SELECT
//       //                 ${this.name.toLowerCase()}_name,
//       //                 owner_id
//       //                 JOIN
//       //                 FROM ${this.name.toLowerCase()}s;`;
//       // const [foundRow] = await poolPromise.query(sqlQuery);
//       const foundRow = await db.projects.findMany({
//         where: {
//           owner_id: id,
//         },
//         select: {
//           project_name: true,
//           owner_id: true,
//         },
//       });
//       return foundRow;
//     } catch (error) {
//       throw error;
//     }
//   }

//   static async create(query) {
//     try {
//       const { project_name } = query;
//       let foundRow = await project.findByName(project_name);
//       if (foundRow) {
//         throw new Errors.badRequestError(
//           `${this.name.toLowerCase()} with name ${project_name} already exists.`
//         );
//       }
//       let sqlQuery = `
//                     INSERT INTO ${this.name.toLowerCase()}s
//                     (${this.name.toLowerCase()}_name)
//                     VALUES (?,?,?)`;
//       let sqlArgum = [material_name];
//       const [newRow] = await poolPromise.query(sqlQuery, sqlArgum);
//       const id = newRow.insertId;
//       const createdRow = await project.publicInfoById(id);
//       return createdRow;
//     } catch (error) {
//       throw error;
//     }
//   }

//   static async update(id, query) {
//     try {
//       const foundRow = await project.findById(id);
//       if (query.project_name === foundRow.project_name) {
//         throw new Errors.badRequestError(
//           "this name is already used for another project. Enter another name"
//         );
//       }
//       let filteredQueryKeysArray = [];
//       let sqlArgum = [];
//       Object.keys(query).map((key) => {
//         if (query[key] !== foundRow[key]) {
//           filteredQueryKeysArray.push(key);
//           sqlArgum.push(query[key]);
//         }
//       });
//       sqlArgum.push(id);

//       if (!filteredQueryKeysArray.length) {
//         throw new Errors.badRequestError(
//           "all the entered values are the same, enter new values to update"
//         );
//       }

//       const setClause = filteredQueryKeysArray
//         .map((item) => `${item} = ?`)
//         .join(", ");
//       let sqlQuery = `UPDATE ${this.name.toLowerCase()}s SET ${setClause} WHERE ${this.name.toLowerCase()}_id= ?;`;
//       console.log(sqlQuery);
//       console.log(sqlArgum);

//       const updatedRow = await poolPromise
//         .query(sqlQuery, sqlArgum)
//         .then(async () => {
//           return await project.publicInfoById(id);
//         })
//         .catch((error) => {
//           throw error;
//         });
//       return updatedRow;
//     } catch (error) {
//       throw error;
//     }
//   }

//   static async delete(id) {
//     try {
//       const foundRow = await project.findById(id);
//       let sqlQuery = `
//                     DELETE FROM ${this.name.toLowerCase()}s
//                     WHERE project_id = ?`;
//       let sqlArgum = [id];
//       const message = await poolPromise
//         .query(sqlQuery, sqlArgum)
//         .then(() => {
//           return `the ${this.name.toLowerCase()} with name ${
//             foundRow.project_name
//           } is deleted`;
//         })
//         .catch((error) => {
//           throw error;
//         });
//       return message;
//     } catch (error) {
//       throw error;
//     }
//   }
// }

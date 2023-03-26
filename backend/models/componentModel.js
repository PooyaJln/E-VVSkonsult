// const { poolPromise, pool } = require("../connections/dbConnection");
// const Errors = require("../utils/errors");

// ----------------------------------------------Sequelize model definition
const Component = (sequelize, DataTypes) => {
  return sequelize.define(
    "component",
    {
      component_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      component_name: {
        type: DataTypes.STRING,
        required: true,
        unique: true,
        notNull: true,
        notEmpty: true,
        allowNull: false,
      },
      component_categ: {
        type: DataTypes.STRING,
        required: true,
        notNull: true,
        notEmpty: true,
        allowNull: false,
        validate: {
          isIn: {
            args: [["window", "door", "wall", "roof/floor slab"]],
            msg: `for the category, you can only choose among 'window', 'door', 'wall' or 'roof/floor slab'`,
          },
        },
      },
      component_uvalue: {
        type: DataTypes.DECIMAL(5, 3),
        required: true,
        notNull: true,
        notEmpty: true,
        allowNull: false,
      },
      component_area: {
        type: DataTypes.DECIMAL(10, 3),
        allowNull: true,
      },
      component_qinf: {
        type: DataTypes.INTEGER,
        required: false,
        allowNull: true,
      },
      project_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "components",
      underscored: true,
      timestamps: false,
      paranoid: true,
    }
  );
};
module.exports = Component;

//------ Mysql Model definition
// class Component_ {
//   constructor(_name, categ, value) {
//     this.component_name = _name;
//     this.component_uValue = value;
//     this.component_categ = categ;
//   }

//   static async publicInfoById(id) {
//     const sqlQuery = `
//                     SELECT ${this.name.toLowerCase()}_name, component_uValue, component_categ
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
//   static async findById(id) {
//     const sqlQuery = `
//                     SELECT *
//                     FROM ${this.name.toLowerCase()}s
//                     WHERE ${this.name.toLowerCase()}_id = ?;`;
//     const sqlArgum = [id];
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

//   static async findByName(_name) {
//     const sqlQuery = `
//                     SELECT *
//                     FROM ${this.name.toLowerCase()}s
//                     WHERE ${this.name.toLowerCase()}_name = ?;`;
//     const sqlArgum = [_name];
//     try {
//       const [foundRow] = await poolPromise.query(sqlQuery, sqlArgum);
//       return foundRow[0];
//     } catch (error) {
//       throw error;
//     }
//   }

//   static async getAll() {
//     const sqlQuery = `SELECT * FROM ${this.name.toLowerCase()}s;`;
//     try {
//       const [foundRow] = await poolPromise.query(sqlQuery);
//       return foundRow;
//     } catch (error) {
//       throw error;
//     }
//   }

//   static async publicGetAll() {
//     const sqlQuery = `SELECT ${this.name.toLowerCase()}_name, ${this.name.toLowerCase()}_uValue, ${this.name.toLowerCase()}_categ
//                     FROM ${this.name.toLowerCase()}s;`;
//     try {
//       const [foundRow] = await poolPromise.query(sqlQuery);
//       return foundRow;
//     } catch (error) {
//       throw error;
//     }
//   }

//   static async create(query) {
//     try {
//       const { component_name, component_uValue, component_categ } = query;
//       let foundRow = await Component.findByName(component_name);
//       if (foundRow) {
//         throw new Errors.badRequestError(
//           `${this.name.toLowerCase()} with name ${component_name} already exists.`
//         );
//       }
//       let sqlQuery = `
//                     INSERT INTO ${this.name.toLowerCase()}s
//                     (${this.name.toLowerCase()}_name, component_uValue, component_categ)
//                     VALUES (?,?,?)`;
//       let sqlArgum = [component_name, component_uValue, component_categ];
//       const [newRow] = await poolPromise.query(sqlQuery, sqlArgum);
//       const id = newRow.insertId;
//       const createdRow = await Component.publicInfoById(id);
//       return createdRow;
//     } catch (error) {
//       throw error;
//     }
//   }

//   static async update(id, query) {
//     try {
//       if (query.component_name) {
//         const alreadyExistingRowWithRequestedName = await Component.findByName(
//           query.component_name
//         );
//         if (
//           alreadyExistingRowWithRequestedName &&
//           id != alreadyExistingRowWithRequestedName.component_id
//         ) {
//           throw new Errors.badRequestError(
//             "this name is already used for another component. Enter another name "
//           );
//         }
//       }

//       const foundRow = await Component.findById(id);
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
//           return await Component.publicInfoById(id);
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
//       const foundRow = await Component.findById(id);
//       let sqlQuery = `
//                     DELETE FROM ${this.name.toLowerCase()}s
//                     WHERE ${this.name.toLowerCase()}_id = ?`;
//       let sqlArgum = [id];
//       const message = await poolPromise
//         .query(sqlQuery, sqlArgum)
//         .then(() => {
//           return `the ${this.name.toLowerCase()} with name ${
//             foundRow.component_name
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

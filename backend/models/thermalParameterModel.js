"use strict";
// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class thermalParameter extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   thermalParameter.init(
//     {
//       parameter_id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//       parameter_name: {
//         type: DataTypes.STRING,
//         required: true,
//         unique: true,
//         notNull: true,
//         notEmpty: true,
//         allowNull: false,
//       },
//       parameter_value: {
//         type: DataTypes.DECIMAL(5, 2),
//         required: true,
//         unique: true,
//         notNull: true,
//         notEmpty: true,
//         allowNull: false,
//       },
//       parmater_unit: DataTypes.STRING,
//     },
//     {
//       sequelize,
//       modelName: "thermalParameter",
//       tableName: "thermalParameters",
//       underscored: true,
//       timestamps: false,
//       paranoid: true,
//     }
//   );
//   return thermalParameter;
// };

// --------------------------------- Sequelize Model
const thermalParameter = (sequelize, DataTypes) => {
  return sequelize.define(
    "thermalParameter",
    {
      parameter_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      parameter_name: {
        type: DataTypes.STRING,
        required: true,
        unique: true,
        notNull: true,
        notEmpty: true,
        allowNull: false,
      },
      parameter_value: {
        type: DataTypes.DECIMAL(5, 2),
        required: true,
        unique: true,
        notNull: true,
        notEmpty: true,
        allowNull: false,
      },
      parmater_unit: DataTypes.STRING,
    },
    {
      tableName: "thermalParameters",
      underscored: true,
      timestamps: false,
      paranoid: true,
    }
  );
};

module.exports = thermalParameter;

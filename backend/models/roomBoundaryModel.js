"use strict";
const { poolPromise, pool } = require("../connections/dbConnection");
const Errors = require("../utils/errors");
const { Sequelize, DataTypes } = require("sequelize");

const roomBoundary = (sequelize, DataTypes) => {
  return sequelize.define(
    "roomBoundary",
    {
      boundary_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      boundary_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      boundary_type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [["wall", "roof", "floor"]],
            msg: "Must be either 'wall', 'roof' or 'floor'",
          },
        },
      },
      boundary_area: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      boundary_length: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      boundary_width: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      boundary_isShared: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },

      room1_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
      },
      room2_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        required: {
          validate: {
            isTrue() {
              if (this.isShared === true) {
                return true;
              } else {
                return false;
              }
            },
          },
        },
      },
    },
    {
      tableName: "roomBoundaries",
      underscored: true,
      timestamps: false,
      paranoid: true,
    }
  );
};
module.exports = roomBoundary;
//--------------------------------------- MongoDB
// const mongoose = require('mongoose')
// const Schema = mongoose.Schema;
// // const connection = require('../connections/dbConnection');
// // const connection = require('../connections/dbConnections');
// const Room = require('./roomModel')
// const temperature = require('./temperatureModel')
// const EnvelopeType = require('./temp/envelopeTypeModel')

// const openingSchema = new Schema(
//     {
//         index: {
//             type: String,
//             required: true
//         },
//         envelopeType: {
//             type: Schema.Types.ObjectId,
//             ref: 'envelopeType',
//             required: true
//         },
//         Height: {
//             type: Number,
//             required: false
//         },
//         Width: {
//             type: Number,
//             required: false
//         },
//         Area: {
//             type: Number,
//             required: false
//         },
//         uValue: {
//             type: Number,
//             required: false
//         },
//         temperatureIn: {
//             type: Number,
//             required: false
//         },
//         temperatureOut: {
//             type: Number,
//             required: false
//         },
//         heatLoss: {
//             type: "Decimal128",
//             required: false
//         },
//         Room: {
//             type: Schema.Types.ObjectId,
//             ref: 'room',
//             required: false
//         }
//     }
// )
// openingSchema.pre('save', async function (next) {
//     this.Room = this.parent().Room
//     const fetchedRoom = await Room.findById({ _id: this.Room })
//     const temperatureInId = fetchedRoom.temperatureIn
//     const temperatureInDoc = await temperature.findById({ _id: temperatureInId })
//     this.temperatureIn = temperatureInDoc.Value
//     this.temperatureOut = this.parent().temperatureOut
//     const openingType = await EnvelopeType.findById({ _id: this.envelopeType })
//     this.uValue = openingType.uValue
//     if (!this.Area) {
//         this.Area = this.Height * this.Width
//     } else {
//         this.Area
//     }
//     this.heatLoss = this.Area * this.uValue * (this.temperatureIn - this.temperatureOut)
//     next();
// })

// // const Opening = mongoose.model('opening', openingSchema)

// const wallSchema = new Schema(
//     {
//         index: {
//             type: String,
//             required: true
//         },
//         Room: {
//             type: Schema.Types.ObjectId,
//             ref: 'room',
//             required: false
//         },
//         envelopeType: {
//             type: Schema.Types.ObjectId,
//             ref: 'envelopeType',
//             required: true
//         },
//         uValue: {
//             type: Number,
//             required: false
//         },
//         Height: {
//             type: Number,
//             required: false
//         },
//         Width: {
//             type: Number,
//             required: false
//         },
//         Area: {
//             type: Number,
//             required: false
//         },
//         openings: {
//             type: [openingSchema],
//             required: false
//         },
//         netArea: {
//             type: Number,
//             required: false
//         },
//         temperatureIn: {
//             type: Schema.Types.ObjectId,
//             ref: 'room',
//             required: false
//         },
//         temperatureOut: {
//             type: Number,
//             required: false
//         },
//         heatLoss: {
//             type: "Decimal128",
//             required: false
//         }

//     },
// );

// wallSchema.pre('save', async function (next) {
//     let openingsArea = 0;
//     const fetchedRoom = await Room.findById({ _id: this.Room })
//     const temperatureInId = fetchedRoom.temperatureIn
//     const temperatureInDoc = await temperature.findById({ _id: temperatureInId })
//     this.temperatureIn = temperatureInDoc.Value
//     const wallType = await EnvelopeType.findById({ _id: this.envelopeType })
//     this.uValue = wallType.uValue
//     this.openings.forEach(element => {
//         openingsArea += element.Area
//     });
//     if (!this.Area) {
//         this.netArea = this.Height * this.Width - openingsArea
//     } else {
//         this.netArea = this.Area - openingsArea
//     }
//     this.heatLoss = this.netArea * this.uValue * (this.temperatureIn - this.temperatureOut)
//     next();
// })

// const wallModel = mongoose.model('Wall', wallSchema)
// // const wallModel = connection.model('Wall', wallSchema)
// // const wallModel = connection.appDbConnection.model('Wall', wallSchema)
// module.exports = wallModel

// // module.exports = wallSchema

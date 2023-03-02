"use strict";
const { poolPromise, pool } = require("../connections/dbConnection");
const Errors = require("../utils/errors");
const { Sequelize, DataTypes } = require("sequelize");
const db = require("../models");

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
        // on the FrontEnd we should recommend the user to choose a name for their conveniece.
        type: DataTypes.STRING,
        allowNull: true,
      },
      room1_id: {
        type: DataTypes.INTEGER,
        required: true,
        notNull: true,
        notEmpty: true,
        allowNull: false,
      },
      boundary_type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [["wall", "roof", "floor", "door", "window"]],
            msg: `Must be either 'wall', 'roof', 'floor', 'door' or 'window'`,
          },
        },
      },
      uvalue_id: {
        type: DataTypes.INTEGER,
        required: true,
        notNull: true,
        notEmpty: true,
        allowNull: false,
      },
      uvalue: {
        type: DataTypes.VIRTUAL,
      },
      length: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      width: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      area: {
        type: DataTypes.DECIMAL(10, 3),
        required: true,
        notNull: true,
        notEmpty: true,
        allowNull: false,
      },

      net_area: {
        type: DataTypes.VIRTUAL,
        notNull: false,
        allowNull: true,
      },

      out_temp_id: {
        type: DataTypes.INTEGER,
        required: true,
        notNull: true,
        notEmpty: true,
        allowNull: false,
      },
      outside_temp: {
        type: DataTypes.VIRTUAL,
      },
      inside_temp: {
        type: DataTypes.VIRTUAL,
      },
      trans_heat_loss: {
        type: DataTypes.VIRTUAL,
        notNull: false,
        allowNull: true,
        defaultValue: 0,
      },
      infilt_heat_loss: {
        type: DataTypes.VIRTUAL,
        notNull: false,
        allowNull: true,
        defaultValue: 0,
      },
      total_heat_loss: {
        type: DataTypes.VIRTUAL,
        notNull: false,
        allowNull: true,
        defaultValue: 0,
      },

      has_openings: {
        // a door or a window is considered an opening.
        // a wall or roof can contain window or door.
        // if this is true the opening_area will be set
        // as the sum of all opening areas for their parent
        // aka a wall or roof that contains them.
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
        // set(value) {
        //   if (this.boundary_type == "door" || this.boundary_type == "window") {
        //     this.setDataValue("has_opening", false);
        //   }
        //   if (
        //     this.boundary_type == "wall" ||
        //     this.boundary_type == "roof" ||
        //     this.boundary_type == "floor"
        //   ) {
        //     this.setDataValue("has_opening", value);
        //   }
        // },
      },
      opening_area: {
        // if this is a window or door the opening area is 0.
        // else this is the sum of all openings in it.
        type: DataTypes.VIRTUAL,
        notNull: false,
        allowNull: true,
        defaultValue: 0,
      },
      boundary_parent_id: {
        // if type = window/door then UI should ask for
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      is_shared: {
        // UI should ask if this boundary, i.e wall is shared with another room.
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: null,
      },
      room2_id: {
        // if ishared = true then UI should ask for the second room id.
        // if the heat loss for a boundary is a positive value it should
        // b added as a negative value to the other room.
        type: DataTypes.INTEGER,
        allowNull: true,
        required: false,
      },
      groundConnected: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      isBetween0_1: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      isBetween1_6: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
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

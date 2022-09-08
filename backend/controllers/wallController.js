// const mongoose = require('mongoose')
const { WallModel } = require('../models/wallModel');
// const projDbConnections = require('../connections/projdbConnection');
const { Room } = require('../models/roomModel')
const { EnvelopeType } = require('../models/envelopeTypeModel');

const createWall = async (req, res) => {
    const { index, Room, envelopeType, Area, Height, Width, openings, temperatureOut } = req.body;
    try {
        let passedValues;

        if (!Area) {
            passedValues = { index, Room, envelopeType, Area, Height, Width, openings, temperatureOut }
        } else {
            passedValues = { index, Room, envelopeType, Area, openings, temperatureOut }
        }
        const newWall = await WallModel.create(passedValues)
        res.status(200).json(newWall)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}




module.exports = {
    createWall
}

// ,
//     getAllWalls,
//     wallsInRoom,
//     getSingleWall,
//     wallUpdate,
//     deleteAWall


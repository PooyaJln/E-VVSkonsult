const mongoose = require('mongoose')
const { WallModel } = require('../models/wallModel');
const projDbConnections = require('../connections/projdbConnection')

const createWall = async (req, res) => {
    const { index, Room, envelopeType, Area, Height, Width } = req.body;
    try {
        const newWall = await WallModel.create({ index, Room, envelopeType, Area, Height, Width })
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
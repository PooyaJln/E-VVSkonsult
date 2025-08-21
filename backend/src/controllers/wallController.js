// const wallSchema = require('../models/wallModel');
// const connection = require('../connections/dbConnections');
// const Walls = connection.appDbConnection.model('wall', wallSchema)

const walls = require('../models/wallModel');
// get all temperatures
const getAllWalls = async (req, res) => {
    const allWalls = await walls.find({}).sort('Name asc')
    res.status(200).json(allWalls)
}
const createWall = async (req, res) => {
    const { index, Room, envelopeType, Area, Height, Width, openings, temperatureOut } = req.body;
    try {
        let passedValues;
        if (!Area) {
            passedValues = { index, Room, envelopeType, Area, Height, Width, openings, temperatureOut }
        } else {
            passedValues = { index, Room, envelopeType, Area, openings, temperatureOut }
        }
        const newWall = await walls.create(passedValues)
        res.status(200).json(newWall)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

module.exports = {
    getAllWalls,
    createWall
}

// ,
//     getAllWalls,
//     wallsInRoom,
//     getSingleWall,
//     wallUpdate,
//     deleteAWall


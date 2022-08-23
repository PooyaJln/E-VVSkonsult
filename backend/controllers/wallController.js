const mongoose = require('mongoose')
const { WallModel } = require('../models/wallModel');
const projDbConnections = require('../connections/projdbConnection')





module.export = {
    createWall,
    getAllWalls,
    wallsInRoom,
    getSingleWall,
    wallUpdate,
    deleteAWall
}
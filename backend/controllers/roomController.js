// // const mongoose = require('mongoose')

// // const rooms = require('../models/roomModel')
// // const apartments = require('../models/apartmentModel')

const { poolPromise, pool } = require('../connections/dbConnection')
const { findProjectIdByNameSql } = require('./projectController')
const { findBuildingByIdSql, findBuildingIdByNameSql } = require('./buildingController')

// get all rooms
const getAllRooms = async (req, res) => {
    const allRooms = await rooms.find({}).sort('Name asc')
    res.status(200).json(allRooms)
}

// get all rooms in a single apartment
const roomsInApartment = async (req, res) => {
    const { name } = req.params;
    try {
        const apartment = await apartments.findOne({ Name: name }).exec()
        const apartmentId = apartment._id
        const allRoomsInApartment = await rooms.find({ 'apartment': apartmentId }, 'apartment roofArea floorArea').populate('apartment').exec()
        console.log(allRoomsInApartment.length)
        res.status(200).json(allRoomsInApartment)

    } catch (error) {
        res.status(404).json({ error: error.message })
    }

}
// create a new room
const createRoom = async (req, res) => {
    const {
        Name,
        apartment,
        temperatureIn,
        roofArea,
        floor_0_1_Area,
        floor_1_5_Area,
        floorArea,
    } = req.body;
    try {
        const room = await rooms.create({ Name, apartment, temperatureIn, roofArea, floor_0_1_Area, floor_1_5_Area, floorArea })
        res.status(200).json(room)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
    //res.json({ mssg: "add new input data page" })
}
// update a room
const roomUpdate = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        res.status(404).json({ error: "This room doesn't exist" })
    }
    var room = await rooms.findByIdAndUpdate(id)
    // check if walls in the request is empty .map or .filter
    if (req.body.walls.length != 0) {
        console.log('new wall is not empty')
        room = await rooms.findByIdAndUpdate(id, { $addToSet: { walls: req.body.walls } }, { new: true })
    } else {
        room = await rooms.findByIdAndUpdate(id, req.body, { new: true })
    }
    if (!room) {
        return res.status(404).json({ error: 'No such a room' })
    }
    res.status(200).json(room)
}

//get a single room
const getSingleRoom = async (req, res) => {
    // const id = req.param.id;
    const { id } = req.params;
    // we need to validate type of the id
    if (!mongoose.isValidObjectId(id)) {
        // if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "This room doesn't exist" })
    }
    const room = await rooms.findById(id)
    if (!room) {
        return res.status(404).json({ error: 'No such a room' })
    }
    res.status(200).json(room)
}

//delete a single room
const deleteARoom = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        res.status(404).json({ error: "Rooms was not found" })
    }
    const room = await rooms.findByIdAndDelete(id)
    if (!room) {
        return res.status(404).json({ error: 'No such a room' })
    }
    res.status(200).json(room)

}
module.exports = {
    getAllRooms,
    createRoom,
    roomUpdate,
    getSingleRoom,
    deleteARoom,
    roomsInApartment
}
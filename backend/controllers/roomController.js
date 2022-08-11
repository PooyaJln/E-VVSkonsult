const Room = require('../models/roomModel');
const mongoose = require('mongoose')

// get all rooms
const getAllRooms = async (req, res) => {
    const allRooms = await Room.find({}).sort('roomName asc')
    res.status(200).json(allRooms)
}
// create a new room
const createRoom = async (req, res) => {
    const {
        Name,
        floor,
        apartment,
        temperatureIn,
        roofArea,
        floor_0_1_Area,
        floor_1_5_Area,
        floorArea,
        walls
    } = req.body;
    try {
        const room = await Room.create({ Name, floor, apartment, temperatureIn, roofArea, floor_0_1_Area, floor_1_5_Area, floorArea, walls })
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
    // check if walls in the request is empty .map or .filter
    if (req.body.walls.length != 0) {
        console.log('new wall is not empty')
        await Room.findByIdAndUpdate(id, { $addToSet: { walls: req.body.walls } }, { new: true })
    }
    // if (req.body.walls.windows.length != 0){
    //     await Room.findByIdAndUpdate(id, {$addToSet: {windows : req.body.walls.windows}}, { new: true })
    // }
    // if (req.body.walls.doors.length != 0){
    //     await Room.findByIdAndUpdate(id, {$addToSet: {doors : req.body.walls.doors}}, { new: true })
    // }
    const room = await Room.findByIdAndUpdate(id, req.body, { new: true })
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
    const room = await Room.findById(id)
    if (!room) {
        return res.status(404).json({ error: 'No such a room' })
    }
    res.status(200).json(room)
}

//delete a single room
const deleteARoom = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        res.status(404).json({ error: "Envelope was not found" })
    }
    const room = await Room.findByIdAndDelete(id)
    if (!room) {
        return res.status(404).json({ error: 'No such envelope' })
    }
    res.status(200).json(room)

}
module.exports = {
    getAllRooms,
    createRoom,
    roomUpdate,
    getSingleRoom,
    deleteARoom
}
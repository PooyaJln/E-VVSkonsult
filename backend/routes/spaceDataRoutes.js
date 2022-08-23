const express = require('express');

const router = express.Router();

const {
    getAllApartment,
    createApartment,
    getSingleapartment,
    apartmentUpdate,
    deleteApartment } = require('../controllers/apartmentController');

const { getAllRooms,
    createRoom,
    roomUpdate,
    getSingleRoom,
    deleteARoom,
    roomsInApartment } = require('../controllers/roomController')


///////////////////////////////////////////
//create a apartment
router.post('/apartments', createApartment)

// get all apartments
router.get('/apartments', getAllApartment)

//get a apartment
router.get('/apartments/:id', getSingleapartment)

//update a apartment
router.patch('/apartments/:id', apartmentUpdate)

//delete a apartment
router.delete('/apartments/:id', deleteApartment)
///////////////////////////////////////////////////
//create a room
router.post('/rooms', createRoom)

// get all rooms
router.get('/rooms', getAllRooms)

//get all rooms in a single apartment
router.get('/rooms/apartment/:name', roomsInApartment)

//get a room
router.get('/rooms/:id', getSingleRoom)

//update a room
router.patch('/rooms/:id', roomUpdate)

//delete a room
router.delete('/rooms/:id', deleteARoom)

//////////////////////////////////////////////////////////////////////////////////////////
// //create a wall
// router.post('/walls', createWall)

// // get all walls
// router.get('/walls', getAllWalls)

// //get all walls in a single room
// router.get('/walls/room/:id', wallsInRoom)

// //get a room
// router.get('/walls/:id', getSingleWall)

// //update a room
// router.patch('/walls/:id', wallUpdate)

// //delete a room
// router.delete('/walls/:id', deleteAWall)

//////////////////////////////////////////////////////////////7
module.exports = router;
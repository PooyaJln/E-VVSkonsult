const mongoose = require('mongoose')
const { Apartment } = require('../models/roomModel');

// get all apartments
const getAllApartment = async (req, res) => {
    const allApartment = await Apartment.find({}).sort('Name asc')
    res.status(200).json(allApartment)
}
// create a new apartment
const createApartment = async (req, res) => {
    const { Name, floorNr } = req.body;
    try {
        const newApartment = await Apartment.create({ Name, floorNr })
        res.status(200).json(newApartment)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
    //res.json({ mssg: "add new input data page" })
}

//show a single apartment
const getSingleapartment = async (req, res) => {
    // const id = req.param.id;
    const { id } = req.params;
    console.log(id)
    // we need to validate type of the id
    if (!mongoose.isValidObjectId(id)) {
        // if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such apartment' })
    }
    const apartment = await Apartment.findById(id)
    if (!apartment) {
        return res.status(404).json({ error: 'No such apartment' })
    }
    res.status(200).json(apartment)
}

//update a single apartment
const apartmentUpdate = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        res.status(404).json({ error: "This apartment doesn't exist" })
    }
    const apartment = await Apartment.findByIdAndUpdate(id, req.body, { new: true }) // check for error
    if (!apartment) {
        return res.status(404).json({ error: 'No such apartment' })
    }
    res.status(200).json(apartment)
}


//delete a single apartment
const deleteApartment = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        res.status(404).json({ error: "Apartment was not found" })
    }
    const apartment = await Apartment.findByIdAndDelete(id)
    if (!apartment) {
        return res.status(404).json({ error: 'No such apartment' })
    }
    res.status(200).json(apartment)

}

module.exports = {
    getAllApartment,
    createApartment,
    getSingleapartment,
    apartmentUpdate,
    deleteApartment
}
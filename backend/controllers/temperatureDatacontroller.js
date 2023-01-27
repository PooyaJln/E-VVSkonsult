const { poolPromise, pool } = require("../connections/dbConnection");
const Errors = require("../utils/errors");
const { temperatureServices } = require("../services/temperatureServices");

const temperatureControllers = {};

// create new temperatures
temperatureControllers.createTemperature = async (req, res, next) => {
  try {
    if (!req.body.temperature_name || !req.body.temp_value) {
      throw new Errors.badRequestError("incomplete input data");
    }
    const newTemperature = await temperatureServices.createTemperature(
      req.body
    );
    res.status(200).json(newTemperature);
  } catch (error) {
    next(error);
    // res.status(404).json({ error: error.message });
  }
};
// get all temperatures
temperatureControllers.getAllTemperatures = async (req, res, next) => {
  try {
    const allTemperatures = await temperatureServices.getAlltemperatures();
    res.status(200).json(allTemperatures);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// update an envelope
temperatureControllers.temperatureUpdate = async (req, res, next) => {
  const { id } = req.params;
  const { newTempName, newTempValue } = req.body;
  try {
    const updatedTemperature = await temperatureServices.updatedTemperature(
      id,
      newTempName,
      newTempValue
    );
  } catch (error) {
    next(error);
    console.error(error);
    res.status(404).json({ error: error.message });
  }
};

//get a single envelope
temperatureControllers.getSingleTemperature = async (req, res, next) => {
  // const id = req.param.id;
  const { id } = req.params;
  // we need to validate type of the id
  if (!mongoose.isValidObjectId(id)) {
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such envelope" });
  }
  const temperature = await temperatures.findById(id);
  if (!temperature) {
    return res.status(404).json({ error: "No such envelope" });
  }
  res.status(200).json(temperature);
};

//delete a single envelope
temperatureControllers.deleteATemperature = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    res.status(404).json({ error: "Envelope was not found" });
  }
  const temperature = await temperatures.findByIdAndDelete(id);
  if (!temperature) {
    return res.status(404).json({ error: "No such envelope" });
  }
  res.status(200).json(temperature);
};

/* ------------------------------MongoDB CRUD operations*/
// const mongoose = require('mongoose')

// const temperatures = require('../models/temperatureModel');

// // get all temperatures
// const getAllTemperatures = async (req, res) => {
//     const allTemperatures = await temperatures.find({}).sort('Name asc')
//     res.status(200).json(allTemperatures)
// }
// // create new temperatures
// const createTemperature = async (req, res) => {
//     const { Name, Value } = req.body;
//     try {
//         const newTemperature = await temperatures.create({ Name, Value })
//         res.status(200).json(newTemperature)
//     } catch (error) {
//         res.status(404).json({ error: error.message })
//     }
//     //res.json({ mssg: "add new input data page" })
// }
// // update an envelope
// const temperatureUpdate = async (req, res) => {
//     const { id } = req.params;
//     if (!mongoose.isValidObjectId(id)) {
//         res.status(404).json({ error: "This envelope doesn't exist" })
//     }
//     const temperature = await temperatures.findByIdAndUpdate(id, req.body, { new: true }) // check for error
//     if (!temperature) {
//         return res.status(404).json({ error: 'No such envelope' })
//     }
//     res.status(200).json(temperature)
// }

// //get a single envelope
// const getSingleTemperature = async (req, res) => {
//     // const id = req.param.id;
//     const { id } = req.params;
//     // we need to validate type of the id
//     if (!mongoose.isValidObjectId(id)) {
//         // if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({ error: 'No such envelope' })
//     }
//     const temperature = await temperatures.findById(id)
//     if (!temperature) {
//         return res.status(404).json({ error: 'No such envelope' })
//     }
//     res.status(200).json(temperature)
// }

// //delete a single envelope
// const deleteATemperature = async (req, res) => {
//     const { id } = req.params;
//     if (!mongoose.isValidObjectId(id)) {
//         res.status(404).json({ error: "Envelope was not found" })
//     }
//     const temperature = await temperatures.findByIdAndDelete(id)
//     if (!temperature) {
//         return res.status(404).json({ error: 'No such envelope' })
//     }
//     res.status(200).json(temperature)

// }
module.exports = {
  temperatureControllers,
};

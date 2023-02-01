const Errors = require("../utils/errors");
const Material = require("../models/materialModel");
// const { temperatureServices } = require("../services/temperatureServices");

const materialControllers = {};

// create new materials
materialControllers.createItem = async (req, res, next) => {
  try {
    const { material_name, material_uValue, material_categ } = req.body;
    if (!material_name || !material_uValue || !material_categ) {
      throw new Errors.badRequestError("incomplete input data");
    }
    const newMaterial = await Material.create(req.body);
    res.status(201).json(newMaterial);
  } catch (error) {
    next(error);
  }
};

// get all materials
materialControllers.getAllItems = async (req, res, next) => {
  try {
    const allMaterials = await Material.publicGetAll();
    res.status(200).json(allMaterials);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// update an envelope
materialControllers.updateItem = async (req, res, next) => {
  try {
    const id = req.params.id;
    // console.log("req.body: ", req.body);
    let updatedMaterial = await Material.update(id, req.body);
    return res.status(200).json(updatedMaterial);
  } catch (error) {
    next(error);
  }
};

//get a single envelope
materialControllers.getSingleItem = async (req, res, next) => {
  try {
    const id = req.params.id;
    let material = await Material.findById(id)
      .then(async () => {
        return await Material.publicInfoById(id);
      })
      .catch((error) => {
        throw error;
      });
    res.status(200).json(material);
  } catch (error) {
    next(error);
  }
};

//delete a single material
materialControllers.deleteItem = async (req, res, next) => {
  try {
    const id = req.params.id;
    let message = await Material.delete(id);
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
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
  materialControllers,
};

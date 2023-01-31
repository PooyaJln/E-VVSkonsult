// @ts-check
const Errors = require("../utils/errors");
const Temperature = require("../models/temperatureModel");
// const { temperatureServices } = require("../services/temperatureServices");

const temperatureControllers = {};

// create new temperatures
temperatureControllers.createTemperature = async (req, res, next) => {
  try {
    const { temperature_name, temp_value } = req.body;
    if (!temperature_name || !temp_value) {
      throw new Errors.badRequestError("incomplete input data");
    }
    const temperature = new Temperature(temperature_name, temp_value);
    const newTemperature = await temperature.create();
    res.status(201).json(newTemperature);
  } catch (error) {
    next(error);
  }
};

// get all temperatures
temperatureControllers.getAllTemperatures = async (req, res, next) => {
  try {
    const allTemperatures = await Temperature.Alltemperatures();
    res.status(200).json(allTemperatures);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// update an envelope
temperatureControllers.temperatureUpdate = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { newTempName, newTempValue } = req.body;
    if (!newTempName && !newTempValue) {
      throw new Errors.badRequestError(
        "either new name or temperature should be filled in"
      );
    }
    const foundTemp = await Temperature.findTemperatureById(id);
    if (newTempName && !newTempValue) {
      if (newTempName === foundTemp.temperature_name) {
        throw new Errors.badRequestError(
          "the name is the same, enter a different name to update"
        );
      }
      let updatedTemperature = await Temperature.updateNameById(
        id,
        newTempName
      );

      return res.status(200).json(updatedTemperature);
    }
    if (!newTempName && newTempValue) {
      if (newTempValue == foundTemp.temp_value) {
        throw new Errors.badRequestError(
          "the value is the same, enter a different value to update"
        );
      }
      let updatedTemperature = await Temperature.updateValueById(
        id,
        newTempValue
      );

      return res.status(200).json(updatedTemperature);
    }
    if (newTempName && newTempValue) {
      if (
        newTempName == foundTemp.temperature_name &&
        newTempValue == foundTemp.temp_value
      ) {
        throw new Errors.badRequestError(
          "the name and values are the same, enter new name or new value to update"
        );
      }
      let updatedTemperature = await Temperature.updateNameValueById(
        id,
        newTempName,
        newTempValue
      );

      return res.status(200).json(updatedTemperature);
    }
  } catch (error) {
    next(error);
    // console.error(error);
    // res.status(404).json({ error: error.message });
  }
};

//get a single envelope
temperatureControllers.getSingleTemperature = async (req, res, next) => {
  try {
    const id = req.params.id;
    let temperature = await Temperature.findTemperatureById(id)
      .then(async () => {
        return await Temperature.publicTemperatureInfoById(id);
      })
      .catch((error) => {
        throw error;
      });
    res.status(200).json(temperature);
  } catch (error) {
    next(error);
  }
};

//delete a single temperature
temperatureControllers.deleteTemperature = async (req, res, next) => {
  try {
    const id = req.params.id;
    let message = await Temperature.findTemperatureById(id)
      .then(async () => {
        return await Temperature.delete(id);
      })
      .catch((error) => {
        throw error;
      });
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
  temperatureControllers,
};

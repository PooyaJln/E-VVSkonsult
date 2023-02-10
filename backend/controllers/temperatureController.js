// @ts-check
const Errors = require("../utils/errors");
const Temperature = require("../models/temperatureModel");
// const { temperatureServices } = require("../services/temperatureServices");

const temperatureControllers = {};

// create new temperatures
temperatureControllers.createItem = async (req, res, next) => {
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
temperatureControllers.getAllItems = async (req, res, next) => {
  try {
    const allTemperatures = await Temperature.publicGetAll1();
    res.status(200).json(allTemperatures);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// update an envelope
temperatureControllers.updateItem = async (req, res, next) => {
  try {
    const id = req.params.id;
    let updatedTemperature = await Temperature.update(id, req.body);
    return res.status(200).json(updatedTemperature);
  } catch (error) {
    next(error);
  }
};

//get a single envelope
temperatureControllers.getSingleItem = async (req, res, next) => {
  try {
    const id = req.params.id;
    let temperature = await Temperature.findById(id)
      .then(async () => {
        return await Temperature.publicInfoById(id);
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
temperatureControllers.deleteItem = async (req, res, next) => {
  try {
    const id = req.params.id;
    let message = await Temperature.findById(id)
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

module.exports = temperatureControllers;

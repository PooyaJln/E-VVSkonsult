const Errors = require("../utils/errors");
const temperatureDbServices = require("../services/temperatureDbServices");
const temperatureServices = require("../services/temperatureServices");

//----------------------------------------------------------------
const temperatureControllers = {};

// create new temperature
temperatureControllers.createItem = async (req, res, next) => {
  try {
    const preCreateCheck = await temperatureServices.preCreateCheck(req.body);
    if (preCreateCheck) {
      const newTemperature = await temperatureDbServices.createItem(req.body);
      res.status(201).json(newTemperature);
    }
  } catch (error) {
    next(error);
  }
};

//get a single temperature
temperatureControllers.getItemInfo = async (req, res, next) => {
  try {
    let temperature = await temperatureDbServices.getItem(
      req.params.temperature_id
    );
    if (temperature) res.status(200).json(temperature);
  } catch (error) {
    next(error);
  }
};

//get all temperaturea
temperatureControllers.getAllItems = async (req, res, next) => {
  try {
    const { project_id } = req.body;
    let temperatures = await temperatureDbServices.getAllItems(project_id);
    res.status(200).json(temperatures);
  } catch (error) {
    next(error);
  }
};

// update an temperature
temperatureControllers.updateItem = async (req, res, next) => {
  try {
    const id = req.params.temperature_id;
    const preUpdateCheck = await temperatureServices.preUpdateCheck(
      id,
      req.body
    );
    if (preUpdateCheck) {
      let updatedTemperature = await temperatureDbServices.updateItem(
        req.params.temperature_id,
        req.body
      );
      return res.status(200).json(updatedTemperature);
    }
  } catch (error) {
    next(error);
  }
};

//delete a single temperature
temperatureControllers.deleteItem = async (req, res, next) => {
  try {
    let message = await temperatureDbServices.deleteItem(
      req.params.temperature_id
    );
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};

module.exports = temperatureControllers;

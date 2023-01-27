const { poolPromise, pool } = require("../connections/dbConnection");
const temperatureModel = require("../models/temperatureModel");
const Errors = require("../utils/errors");

const temperatureServices = {};

temperatureServices.createTemperature = async (query) => {
  try {
    const temperature = new temperatureModel(
      query.temperature_name,
      query.temp_value
    );
    const newtemperature = temperature.create();
    return newtemperature;
  } catch (error) {
    throw error;
  }
};

temperatureServices.getAlltemperatures = async () => {
  try {
    const allTemperatures = await temperatureModel.Alltemperatures();
    return allTemperatures;
  } catch (error) {
    throw error;
  }
};

temperatureServices.updateTemperature = async (query) => {
  try {
    const updatedTemperature = await temperature.temperatureUpdate(
      query.id,
      query.newTempName,
      query.newTempvalue
    );
    return updatedTemperature;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  temperatureServices,
};

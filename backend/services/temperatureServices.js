const { poolPromise, pool } = require("../connections/dbConnection");
const Temperature = require("../models/temperatureModel");
const Errors = require("../utils/errors");

const temperatureServices = {};

temperatureServices.createTemperature = async (query) => {
  try {
    const temperature = new Temperature(
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
    const allTemperatures = await Temperature.Alltemperatures();
    return allTemperatures;
  } catch (error) {
    throw error;
  }
};

temperatureServices.updateTemperature = async (query) => {
  try {
    const { id, newTempName, newTempValue } = query;

    if (newTempName && !newTempValue) {
      let updatedTemperature = await Temperature.updateNameById(
        id,
        newTempName
      );

      return updatedTemperature;
    }
    if (!newTempName && newTempValue) {
      let updatedTemperature = await Temperature.updateValueById(
        id,
        newTempValue
      );

      return updatedTemperature;
    }
    if (newTempName && newTempValue) {
      let updatedTemperature = await Temperature.updateNameValueById(
        id,
        newTempName,
        newTempValue
      );

      return updatedTemperature;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  temperatureServices,
};

// @ts-check
const Temperature = require("../models/temperatureModel");
const Errors = require("../utils/errors");

const materialServices = {};

materialServices.createTemperature = async (query) => {
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

materialServices.getAlltemperatures = async () => {
  try {
    const allTemperatures = await Temperature.Alltemperatures();
    return allTemperatures;
  } catch (error) {
    throw error;
  }
};

materialServices.updateTemperature = async (query) => {
  try {
    const { id, newTempName, newTempValue } = query;
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

      return updatedTemperature;
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

      return updatedTemperature;
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

      return updatedTemperature;
    }
  } catch (error) {
    throw error;
  }
};

materialServices.deleteTemperature = async (query) => {
  try {
    let message = await Temperature.findTemperatureById(query)
      .then(async () => {
        return await Temperature.delete(query);
      })
      .catch((error) => {
        throw error;
      });
    return message;
  } catch (error) {
    throw error;
  }
};

materialServices.getSingleTemperature = async (query) => {
  try {
    let temperature = await Temperature.findTemperatureById(query)
      .then(async () => {
        return await Temperature.publicTemperatureInfoById(query);
      })
      .catch((error) => {
        throw error;
      });

    return temperature;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  materialServices,
};

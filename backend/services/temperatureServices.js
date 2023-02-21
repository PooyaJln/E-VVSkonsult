const Errors = require("../utils/errors");
const temperatureDbServices = require("./temperatureDbServices");

const temperatureServices = {};

temperatureServices.preCreateCheck = async (query) => {
  try {
    if (query.temperature_name?.length == 0) {
      throw new Errors.badRequestError(
        "the new name cannot be an empty string"
      );
    }
    if (!query.temperature_name || !query.temperature_value) {
      throw new Errors.badRequestError("incomplete input data");
    }

    if (query.temperature_name) {
      const temperatureNameExists = await temperatureDbServices.itemNameExists(
        query.temperature_name
      );
      if (temperatureNameExists) {
        throw new Errors.badRequestError("this name is already used.");
      }
    }
    return true;
  } catch (error) {
    throw error;
  }
};

temperatureServices.preUpdateCheck = async (id, query) => {
  try {
    if (query.temperature_name?.length == 0) {
      throw new Errors.badRequestError(
        "the new name cannot be an empty string"
      );
    }
    let foundItem = await temperatureDbServices.findItemByID(id);
    if (!foundItem) {
      throw new Errors.badRequestError("no temperature was found");
    }

    if (
      !query.temperature_value &&
      query.temperature_name == foundItem.temperature_name
    ) {
      throw new Errors.badRequestError(
        "same as current name,nothing to change"
      );
    }

    if (
      query.temperature_name == foundItem.temperature_name &&
      query.temperature_value == foundItem.temperature_value
    ) {
      throw new Errors.badRequestError("nothing to change");
    }

    if (
      (!query.temperature_value && query.temperature_name) ||
      (query.temperature_value == foundItem.temperature_value &&
        query.temperature_name)
    ) {
      const temperature_value = foundItem.temperature_value;
      const nameAlreadyExists = await temperatureDbServices.itemNameExists(
        query.temperature_name,
        temperature_value
      );

      if (nameAlreadyExists) {
        throw new Errors.badRequestError(
          "warning for duplicate temperature names! this name already exists."
        );
      }
    }

    if (
      !query.temperature_name &&
      query.temperature_value == foundItem.temperature_value
    ) {
      throw new Errors.badRequestError(
        "same as current temperature, nothing to change"
      );
    }

    // if (
    //   !query.temperature_name &&
    //   query.temperature_value == foundItem.temperature_value
    // ) {
    //   const temperature_name = foundItem.temperature_name;
    //   const nameAlreadyExists = await temperatureDbServices.itemNameExists(
    //     temperature_name,
    //     query.temperature_value
    //   );

    //   if (nameAlreadyExists) {
    //     throw new Errors.badRequestError("no change in temperature happened");
    //   }
    // }

    // if (query.temperature_name && query.temperature_value) {
    //   const nameAlreadyExists = await temperatureDbServices.itemNameExists(
    //     query.temperature_name,
    //     query.temperature_value
    //   );

    //   if (nameAlreadyExists) {
    //     throw new Errors.badRequestError(
    //       "this name is already used for another temperature !2"
    //     );
    //   }
    // }
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = temperatureServices;

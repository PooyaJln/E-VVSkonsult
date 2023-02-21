const Errors = require("../utils/errors");
const db = require("../models");

const temperatureDbServices = {};

temperatureDbServices.findItemByID = async (id) => {
  try {
    const item = await db.temperature.findOne({
      where: {
        temperature_id: id,
      },
    });
    if (item) return item;
    return false;
  } catch (error) {
    throw error;
  }
};

temperatureDbServices.itemsPublicInfo = async (id) => {
  try {
    const item = await db.temperature.findOne({
      where: {
        temperature_id: id,
      },
      attributes: ["temperature_name", "temperature_value"],
    });
    if (item) return item;
    return false;
  } catch (error) {
    throw error;
  }
};

temperatureDbServices.getItem = async (id) => {
  try {
    let item = await temperatureDbServices.itemsPublicInfo(id);
    if (!item)
      throw new Errors.badRequestError("this temperature was not found");
    return item;
  } catch (error) {
    throw error;
  }
};

temperatureDbServices.itemNameExists = async (_name) => {
  try {
    const item = await db.temperature.findOne({
      where: {
        temperature_name: _name,
      },
    });
    if (item) return item;
    return false;
  } catch (error) {
    throw error;
  }
};

temperatureDbServices.createItem = async (query) => {
  try {
    const newItem = await db.temperature.create(query);
    const newId = newItem.temperature_id;
    const item = await temperatureDbServices.itemsPublicInfo(newId);
    return item;
  } catch (error) {
    throw error;
  }
};

temperatureDbServices.getAllItems = async () => {
  try {
    const temperatures = await db.temperature.findAll({
      attributes: ["temperature_name", "temperature_value"],
    });
    return temperatures;
  } catch (error) {
    throw error;
  }
};
temperatureDbServices.updateItem = async (id, query) => {
  try {
    await db.temperature.update(query, {
      where: {
        temperature_id: id,
      },
    });

    const updatedItem = await temperatureDbServices.itemsPublicInfo(id);

    return updatedItem;
  } catch (error) {
    throw error;
  }
};

temperatureDbServices.deleteItem = async (id) => {
  try {
    let foundItem = await temperatureDbServices.findItemByID(id);
    if (!foundItem) {
      throw new Errors.badRequestError("no temperature was found");
    }
    const temperature_name = foundItem.temperature_name;
    await db.temperature.destroy({
      where: {
        temperature_id: id,
      },
    });

    const message = `the temperature with name ${temperature_name} is deleted`;
    return message;
  } catch (error) {
    throw error;
  }
};
module.exports = temperatureDbServices;

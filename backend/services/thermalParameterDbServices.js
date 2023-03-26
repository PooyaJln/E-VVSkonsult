const Errors = require("../utils/errors");
const db = require("../models");

const thermalParameterDbServices = {};

thermalParameterDbServices.getAllItems = async (id) => {
  try {
    let items = await db.thermalParameter.findAll({
      where: {
        project_id: id,
      },
      attributes: [
        "project_id",
        "parameter_name",
        "parameter_value",
        "parameter_unit",
      ],
    });

    if (items) return items;
    return false;
  } catch (error) {
    throw error;
  }
};

thermalParameterDbServices.updateItem = async (query, id) => {
  try {
    await db.thermalParameter.update(query, {
      where: {
        parameter_id: id,
      },
    });

    const updatedItem = await db.thermalParameter.findOne({
      where: {
        parameter_id: id,
      },
      attributes: [
        "parameter_id",
        "parameter_name",
        "parameter_value",
        "parameter_unit",
      ],
    });

    return updatedItem;
  } catch (error) {
    throw error;
  }
};

module.exports = thermalParameterDbServices;

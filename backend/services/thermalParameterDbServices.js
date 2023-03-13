const Errors = require("../utils/errors");
const db = require("../models");

const thermalParameterDbServices = {};

thermalParameterDbServices.getAllItems = async () => {
  try {
    let items = await db.thermalParameter.findAll({
      attributes: ["parameter_name", "parameter_value", "parameter_unit"],
    });

    if (items) return items;
    return false;
  } catch (error) {
    throw error;
  }
};

thermalParameterDbServices.updateItem = async (_name, query) => {
  try {
    await db.thermalparameter.update(query, {
      where: {
        parameter_name: _name,
      },
    });

    const updatedItem = await db.thermalparameter.findOne({
      where: {
        parameter_name: query.parameter_name,
      },
      attributes: ["parameter_name", "parameter_value", "parmater_unit"],
    });

    return updatedItem;
  } catch (error) {
    throw error;
  }
};

module.exports = thermalParameterDbServices;

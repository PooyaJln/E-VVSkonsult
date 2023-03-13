const Errors = require("../utils/errors");
const thermalParameterDbServices = require("../services/thermalParameterDbServices");

//----------------------------------------
const thermalParameterControllers = {};

// get all projects
thermalParameterControllers.getAllItems = async (req, res, next) => {
  try {
    const allItems = await thermalParameterDbServices.getAllItems();
    res.status(200).json(allItems);
  } catch (error) {
    next(error);
  }
};

// update
thermalParameterControllers.updateItem = async (req, res, next) => {
  try {
    const parameterName = req.params._name;
    let updatedProject = await thermalParameterDbServices.updateItem(
      parameterName,
      req.body
    );
    return res.status(200).json(updatedProject);
  } catch (error) {
    next(error);
  }
};

module.exports = thermalParameterControllers;

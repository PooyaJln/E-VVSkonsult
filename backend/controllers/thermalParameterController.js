const Errors = require("../utils/errors");
const thermalParameterDbServices = require("../services/thermalParameterDbServices");

//----------------------------------------
const thermalParameterControllers = {};

// get all projects
thermalParameterControllers.getAllItems = async (req, res, next) => {
  try {
    const project_id = req.params.project_id;
    const allItems = await thermalParameterDbServices.getAllItems(project_id);
    res.status(200).json(allItems);
  } catch (error) {
    next(error);
  }
};

// update
thermalParameterControllers.updateItem = async (req, res, next) => {
  try {
    const parameter_id = req.params.id;

    let updatedProject = await thermalParameterDbServices.updateItem(
      req.body,
      parameter_id
    );
    return res.status(200).json(updatedProject);
  } catch (error) {
    next(error);
  }
};

module.exports = thermalParameterControllers;

const Errors = require("../utils/errors");
const buildingDbServices = require("../services/buildingDbServices");
const buildingServices = require("../services/buildingServices");

//----------------------------------------
const buildingControllers = {};

// create new projects
buildingControllers.createItem = async (req, res, next) => {
  try {
    const preCreateCheck = await buildingServices.preCreateCheck(req.body);
    if (preCreateCheck) {
      const newBuilding = await buildingDbServices.createItem(req.body);
      res.status(201).json(newBuilding);
    }
  } catch (error) {
    next(error);
  }
};

//get a single project
buildingControllers.getItemInfo = async (req, res, next) => {
  try {
    const building_id = req.params.building_id;
    let building = await buildingDbServices.getItemAndchildren(building_id);
    res.status(200).json(building);
  } catch (error) {
    next(error);
  }
};

// get all projects
buildingControllers.getAllItems = async (req, res, next) => {
  try {
    const project_id = req.params.project_id;
    const allItems = await buildingDbServices.getAllItems(project_id);
    res.status(200).json(allItems);
  } catch (error) {
    next(error);
  }
};

// update an project
buildingControllers.updateItem = async (req, res, next) => {
  try {
    const preUpdateCheck = await buildingServices.preUpdateCheck(
      req.params.building_id,
      req.body
    );
    if (preUpdateCheck) {
      let updatedBuilding = await buildingDbServices.updateItem(
        req.params.building_id,
        req.body
      );
      return res.status(200).json(updatedBuilding);
    }
  } catch (error) {
    next(error);
  }
};

//delete a single project
buildingControllers.deleteItem = async (req, res, next) => {
  try {
    let deletedBuilding = await buildingDbServices.deleteItem(
      req.params.building_id
    );
    res.status(200).json(deletedBuilding);
  } catch (error) {
    next(error);
  }
};

module.exports = buildingControllers;

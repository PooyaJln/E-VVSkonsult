const Errors = require("../utils/errors");
const storeyDbServices = require("../services/storeyDbServices");
const storeyServices = require("../services/storeyServices");

//----------------------------------------------------------------
const storeyControllers = {};

// create new projects
storeyControllers.createItem = async (req, res, next) => {
  try {
    const building_id = req.params.building_id;

    const preCreateCheck = await storeyServices.preCreateCheck({
      ...req.body,
      building_id,
    });
    if (preCreateCheck) {
      const newStorey = await storeyDbServices.createItem({
        ...req.body,
        building_id,
      });
      res.status(201).json(newStorey);
    }
  } catch (error) {
    next(error);
  }
};

//get a single project
storeyControllers.getItemInfo = async (req, res, next) => {
  try {
    let storey = await storeyDbServices.itemsPublicInfo(req.params.storey_id);
    res.status(200).json(storey);
  } catch (error) {
    next(error);
  }
};

// get all projects
storeyControllers.getAllItems = async (req, res, next) => {
  try {
    const building_id = req.params.building_id;
    const allItems = await storeyDbServices.getAllItems(building_id);
    res.status(200).json(allItems);
  } catch (error) {
    next(error);
  }
};
// update an project
storeyControllers.updateItem = async (req, res, next) => {
  try {
    const id = req.params.storey_id;
    const preUpdateCheck = await storeyServices.preUpdateCheck(id, req.body);
    if (preUpdateCheck) {
      let updatedStorey = await storeyDbServices.updateItem(
        req.params.storey_id,
        req.body
      );
      return res.status(200).json(updatedStorey);
    }
  } catch (error) {
    next(error);
  }
};

//delete a single project
storeyControllers.deleteItem = async (req, res, next) => {
  try {
    let deletedStorey = await storeyDbServices.deleteItem(req.params.storey_id);
    res.status(200).json(deletedStorey);
  } catch (error) {
    next(error);
  }
};

module.exports = storeyControllers;

const Errors = require("../utils/errors");
const componentDbServices = require("../services/componentDbServices");
const componentServices = require("../services/componentServices");

//----------------------------------------------------------------
const componentControllers = {};

// create new component
componentControllers.createItem = async (req, res, next) => {
  try {
    const preCreateCheck = await componentServices.preCreateCheck(req.body);
    if (preCreateCheck) {
      const newComponent = await componentDbServices.createItem(req.body);
      res.status(201).json(newComponent);
    }
  } catch (error) {
    next(error);
  }
};

//get a single component
componentControllers.getItemInfo = async (req, res, next) => {
  try {
    let component = await componentDbServices.getItem(req.params.component_id);
    if (component) res.status(200).json(component);
  } catch (error) {
    next(error);
  }
};

//get all componenta
componentControllers.getAllItems = async (req, res, next) => {
  try {
    let components = await componentDbServices.getAllItems();
    res.status(200).json(components);
  } catch (error) {
    next(error);
  }
};

// update an component
componentControllers.updateItem = async (req, res, next) => {
  try {
    const id = req.params.component_id;
    const preUpdateCheck = await componentServices.preUpdateCheck(id, req.body);
    if (preUpdateCheck) {
      let updatedComponent = await componentDbServices.updateItem(
        req.params.component_id,
        req.body
      );
      return res.status(200).json(updatedComponent);
    }
  } catch (error) {
    next(error);
  }
};

//delete a single component
componentControllers.deleteItem = async (req, res, next) => {
  try {
    let message = await componentDbServices.deleteItem(req.params.component_id);
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};

module.exports = componentControllers;

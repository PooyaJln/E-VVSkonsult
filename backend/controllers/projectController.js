const Errors = require("../utils/errors");
const Project = require("../models/projectModel");
const projectDbServices = require("../services/projectDbServices");
const userDbServices = require("../services/userServices/userDbServices");
const projectServices = require("../services/projectServices");

//----------------------------------------
const projectControllers = {};

// create new projects
projectControllers.createItem = async (req, res, next) => {
  try {
    const preCreateCheck = await projectServices.preCreateCheck(req.body);
    if (preCreateCheck) {
      const newProject = await projectDbServices.createItem(req.body);
      res.status(201).json(newProject);
    }
  } catch (error) {
    next(error);
  }
};

// get all projects
projectControllers.getAllItems = async (req, res, next) => {
  try {
    const { owner_id } = req.body;
    const user = await userDbServices.userExists(owner_id);
    if (!user) throw new Errors.notFoundError("user was not found");

    const allItems = await projectDbServices.getAllItems(owner_id);
    res.status(200).json(allItems);
  } catch (error) {
    next(error);
  }
};

// update an project
projectControllers.updateItem = async (req, res, next) => {
  try {
    const preUpdateCheck = await projectServices.preUpdateCheck(req.body);
    if (preUpdateCheck) {
      let updatedProject = await projectDbServices.updateItem(
        req.params.project_id,
        req.body
      );
      return res.status(200).json(updatedProject);
    }
  } catch (error) {
    next(error);
  }
};

//get a single project
projectControllers.getItem = async (req, res, next) => {
  try {
    const project_id = req.params.project_id;
    let project = await projectDbServices.getItemAndchildren(project_id);
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

//delete a single project
projectControllers.deleteItem = async (req, res, next) => {
  try {
    const project_id = req.params.project_id;
    let message = await projectDbServices.deleteItem(project_id);
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};

module.exports = projectControllers;

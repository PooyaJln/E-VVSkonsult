const Errors = require("../utils/errors");
const buildingDbServices = require("../services/buildingDbServices");
const projectDbServices = require("../services/projectDbServices");

//----------------------------------------
const buildingControllers = {};

// create new projects
buildingControllers.createItem = async (req, res, next) => {
  try {
    const { building_name, project_id } = req.body;
    if (!building_name || !project_id) {
      throw new Errors.badRequestError("incomplete input data");
    }
    const project = await projectDbServices.findItemByID(project_id);
    if (!project) {
      throw new Errors.badRequestError("no project was found!");
    }
    const buildingNameExists = await buildingDbServices.itemNameExists(
      building_name,
      project_id
    );
    if (buildingNameExists) {
      throw new Errors.badRequestError("this name is already used.");
    }
    if (!buildingNameExists) {
      const newBuilding = await buildingDbServices.createItem(
        building_name,
        project_id
      );
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
// buildingControllers.getAllItems = async (req, res, next) => {
//   try {
//     const { project_id } = req.body;
//     const user = await userDbServices.userExists(project_id);
//     if (!user) throw new Errors.notFoundError("user was not found");

//     const allItems = await buildingDbServices.getAllItems(project_id);
//     res.status(200).json(allItems);
//   } catch (error) {
//     next(error);
//   }
// };

// update an project
buildingControllers.updateItem = async (req, res, next) => {
  try {
    // if (
    //   req.body.newProject_id == undefined &&
    //   req.body.newBuilding_name?.length == 0
    // ) {
    //   throw new Errors.badRequestError(
    //     "controller:the new name cannot be an empty string!"
    //   );
    // }

    let updatedBuilding = await buildingDbServices.updateItem(
      req.params.building_id,
      req.body
    );
    return res.status(200).json(updatedBuilding);
  } catch (error) {
    next(error);
  }
};

//delete a single project
buildingControllers.deleteItem = async (req, res, next) => {
  try {
    let message = await buildingDbServices.deleteItem(req.params.building_id);
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};

module.exports = buildingControllers;

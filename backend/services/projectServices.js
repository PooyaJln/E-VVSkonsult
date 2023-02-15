const Errors = require("../utils/errors");
const db = require("../models");
const projectDbServices = require("./projectDbServices");
const userDbServices = require("./userServices/userDbServices");

const projectServices = {};

projectServices.preCreateCheck = async (query) => {
  try {
    if (query.project_name?.length == 0) {
      throw new Errors.badRequestError(
        "the new name cannot be an empty string"
      );
    }
    if (!query.project_name || !query.owner_id) {
      throw new Errors.badRequestError("incomplete input data");
    }
    const user = await userDbServices.findItemByID(query.owner_id);
    if (!user) {
      throw new Errors.badRequestError("no user was found!");
    }
    const projectNameExists = await projectDbServices.itemNameExists(
      query.project_name,
      query.owner_id
    );
    if (projectNameExists) {
      throw new Errors.badRequestError("this name is already used.");
    }
    return true;
  } catch (error) {
    throw error;
  }
};

projectServices.preUpdateCheck = async (id, query) => {
  try {
    if (query.newProject_name?.length == 0) {
      throw new Errors.badRequestError(
        "the new name cannot be an empty string"
      );
    }
    let foundItem = await projectDbServices.findItemByID(id);
    if (!foundItem) {
      throw new Errors.badRequestError("no project was found");
    }
    if (
      foundItem.project_name == query.newProject_name &&
      foundItem.owner_id == query.newOwner_id
    ) {
      throw new Errors.badRequestError("nothing to change");
    }
    const nameAlreadyExists = await projectDbServices.itemNameExists(
      query.newProject_name,
      query.newOwner_id
    );

    if (nameAlreadyExists) {
      throw new Errors.badRequestError(
        "this name is already used for another project"
      );
    }
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = projectServices;

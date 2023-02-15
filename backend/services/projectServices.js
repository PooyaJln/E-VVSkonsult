const Errors = require("../utils/errors");
const db = require("../models");
const projectDbServices = require("./projectDbServices");

const projectServices = {};

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

const Errors = require("../utils/errors");
const db = require("../models");
const buildingDbServices = require("./buildingDbServices");
const projectDbServices = require("./projectDbServices");

const buildingServices = {};

buildingServices.preCreateCheck = async (query) => {
  try {
    if (query.building_name?.length == 0) {
      throw new Errors.badRequestError(
        "the new name cannot be an empty string"
      );
    }
    if (!query.building_name || !query.project_id) {
      throw new Errors.badRequestError("incomplete input data");
    }
    const project = await projectDbServices.findItemByID(query.project_id);
    if (!project) {
      throw new Errors.badRequestError("no project was found!");
    }
    const buildingNameExists = await buildingDbServices.itemNameExists(
      query.building_name,
      query.project_id
    );
    if (buildingNameExists) {
      throw new Errors.badRequestError("this name is already used.");
    }
    return true;
  } catch (error) {
    throw error;
  }
};

buildingServices.preUpdateCheck = async (id, query) => {
  try {
    if (query.building_name?.length == 0) {
      throw new Errors.badRequestError(
        "the new name cannot be an empty string"
      );
    }
    let foundItem = await buildingDbServices.findItemByID(id);
    if (!foundItem) {
      throw new Errors.badRequestError("no building was found");
    }

    if (!query.project_id && query.building_name == foundItem.building_name) {
      throw new Errors.badRequestError(
        "same as current name,nothing to change"
      );
    }

    if (!query.project_id && query.building_name) {
      const project_id = foundItem.project_id;
      const nameAlreadyExists = await buildingDbServices.itemNameExists(
        query.building_name,
        project_id
      );

      if (nameAlreadyExists) {
        throw new Errors.badRequestError(
          "this name is already used for another building"
        );
      }
    }

    if (!query.building_name && query.project_id == foundItem.project_id) {
      throw new Errors.badRequestError(
        "same as current project, nothing to change"
      );
    }

    if (!query.building_name && query.project_id) {
      const project_name = foundItem.building_name;
      const nameAlreadyExists = await buildingDbServices.itemNameExists(
        project_name,
        query.project_id
      );

      if (nameAlreadyExists) {
        throw new Errors.badRequestError(
          "there is already a building with this name in this project"
        );
      }
    }

    if (query.building_name && query.project_id) {
      if (
        query.building_name == foundItem.building_name &&
        query.project_id == foundItem.project_id
      ) {
        throw new Errors.badRequestError("nothing to change");
      }

      const nameAlreadyExists = await buildingDbServices.itemNameExists(
        query.building_name,
        query.project_id
      );

      if (nameAlreadyExists) {
        throw new Errors.badRequestError(
          "this name is already used for another building in this project"
        );
      }
    }
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = buildingServices;

const Errors = require("../utils/errors");
const db = require("../models");
const storeyDbServices = require("./storeyDbServices");
const buildingDbServices = require("./buildingDbServices");

const storeyServices = {};
storeyServices.preUpdateCheck = async (id, query) => {
  try {
    if (query.storey_name?.length == 0) {
      throw new Errors.badRequestError(
        "the new name cannot be an empty string"
      );
    }
    let foundItem = await storeyDbServices.findItemByID(id);
    if (!foundItem) {
      throw new Errors.badRequestError("no storey was found");
    }

    if (query.storey_name == foundItem.storey_name && !query.building_id) {
      throw new Errors.badRequestError(
        "same as current name,nothing to change"
      );
    }

    if (query.storey_name && !query.building_id) {
      const building_id = foundItem.building_id;
      const nameAlreadyExists = await storeyDbServices.itemNameExists(
        query.storey_name,
        building_id
      );

      if (nameAlreadyExists) {
        throw new Errors.badRequestError(
          "this name is already used for another storey in this building"
        );
      }
    }
    if (!query.storey_name && query.building_id == foundItem.building_id) {
      throw new Errors.badRequestError(
        "same as current building, nothing to change"
      );
    }
    if (!query.storey_name && query.building_id) {
      const storey_name = foundItem.storey_name;
      const nameAlreadyExists = await storeyDbServices.itemNameExists(
        storey_name,
        query.building_id
      );

      if (nameAlreadyExists) {
        throw new Errors.badRequestError(
          "there is already a storey with this name in the requested building"
        );
      }

      throw new Errors.badRequestError("2. nothing to change");
    }

    if (query.storey_name && query.building_id) {
      if (
        query.storey_name == foundItem.storey_name &&
        query.building_id == foundItem.building_id
      ) {
        throw new Errors.badRequestError("nothing to change");
      }

      const nameAlreadyExists = await storeyDbServices.itemNameExists(
        query.storey_name,
        query.building_id
      );

      if (nameAlreadyExists) {
        throw new Errors.badRequestError(
          "this name is already used for another storey in requested building"
        );
      }
    }

    return true;
  } catch (error) {
    throw error;
  }
};

storeyServices.preCreateCheck = async (query) => {
  try {
    if (query.storey_name?.length == 0) {
      throw new Errors.badRequestError(
        "the new name cannot be an empty string"
      );
    }
    if (!query.storey_name || !query.building_id) {
      throw new Errors.badRequestError("incomplete input data");
    }
    const building = await buildingDbServices.findItemByID(query.building_id);
    if (!building) {
      throw new Errors.badRequestError("no building was found!");
    }
    const storeyNameExists = await storeyDbServices.itemNameExists(
      query.storey_name,
      query.building_id
    );
    if (storeyNameExists) {
      throw new Errors.badRequestError("this name is already used.");
    }
    return true;
  } catch (error) {
    throw error;
  }
};
module.exports = storeyServices;

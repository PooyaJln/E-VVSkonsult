const Errors = require("../utils/errors");
const apartmentDbServices = require("./apartmentDbServices");
const storeyDbServices = require("./storeyDbServices");

const apartmentServices = {};

apartmentServices.preCreateCheck = async (query) => {
  try {
    if (query.apartment_name?.length == 0) {
      throw new Errors.badRequestError(
        "the new name cannot be an empty string"
      );
    }
    if (!query.apartment_name || !query.storey_id) {
      throw new Errors.badRequestError("incomplete input data");
    }
    const storey = await storeyDbServices.findItemByID(query.storey_id);
    if (!storey) {
      throw new Errors.badRequestError("no storey was found!");
    }
    const apartmentNameExists = await apartmentDbServices.itemNameExists(
      query.apartment_name,
      query.storey_id
    );
    if (apartmentNameExists) {
      throw new Errors.badRequestError("this name is already used.");
    }
    return true;
  } catch (error) {
    throw error;
  }
};

apartmentServices.preUpdateCheck = async (id, query) => {
  try {
    if (query.apartment_name?.length == 0) {
      throw new Errors.badRequestError(
        "the new name cannot be an empty string"
      );
    }
    let foundItem = await apartmentDbServices.findItemByID(id);
    if (!foundItem) {
      throw new Errors.badRequestError("no apartment was found");
    }

    if (!query.storey_id && query.apartment_name == foundItem.apartment_name) {
      throw new Errors.badRequestError(
        "same as current name,nothing to change"
      );
    }

    if (!query.storey_id && query.apartment_name) {
      const storey_id = foundItem.storey_id;
      const nameAlreadyExists = await apartmentDbServices.itemNameExists(
        query.apartment_name,
        storey_id
      );

      if (nameAlreadyExists) {
        throw new Errors.badRequestError(
          "this name is already used for another apartment in this storey"
        );
      }
    }

    if (!query.apartment_name && query.storey_id == foundItem.storey_id) {
      throw new Errors.badRequestError(
        "same as current storey, nothing to change"
      );
    }

    if (!query.apartment_name && query.storey_id) {
      const apartment_name = foundItem.apartment_name;
      const nameAlreadyExists = await apartmentDbServices.itemNameExists(
        apartment_name,
        query.storey_id
      );

      if (nameAlreadyExists) {
        throw new Errors.badRequestError(
          "there is already a apartment with this name in the requested storey"
        );
      }
    }

    if (query.apartment_name && query.storey_id) {
      if (
        query.apartment_name == foundItem.apartment_name &&
        query.storey_id == foundItem.storey_id
      ) {
        throw new Errors.badRequestError("nothing to change");
      }

      const nameAlreadyExists = await apartmentDbServices.itemNameExists(
        query.apartment_name,
        query.storey_id
      );

      if (nameAlreadyExists) {
        throw new Errors.badRequestError(
          "this name is already used for another apartment in requested storey"
        );
      }
    }

    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = apartmentServices;

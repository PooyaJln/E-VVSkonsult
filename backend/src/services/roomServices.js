const Errors = require("../utils/errors");
const roomDbServices = require("./roomDbServices");
const apartmentDbServices = require("./apartmentDbServices");

const roomServices = {};

roomServices.preCreateCheck = async (query) => {
  try {
    if (query.room_name?.length == 0) {
      throw new Errors.badRequestError(
        "the new name cannot be an empty string"
      );
    }
    if (!query.room_name || !query.apartment_id || !query.room_temperature) {
      throw new Errors.badRequestError("incomplete input data");
    }
    const apartment = await apartmentDbServices.findItemByID(
      query.apartment_id
    );
    if (!apartment) {
      throw new Errors.badRequestError("no apartment was found!");
    }
    const roomNameExists = await roomDbServices.itemNameExists(
      query.room_name,
      query.apartment_id
    );
    if (roomNameExists) {
      throw new Errors.badRequestError("this name is already used.");
    }
    return true;
  } catch (error) {
    throw error;
  }
};

roomServices.preUpdateCheck = async (id, query) => {
  try {
    if (query.room_name?.length == 0) {
      throw new Errors.badRequestError(
        "the new name cannot be an empty string"
      );
    }
    let foundItem = await roomDbServices.findItemByID(id);
    if (!foundItem) {
      throw new Errors.badRequestError("no room was found");
    }

    if (!query.apartment_id && query.room_name == foundItem.room_name) {
      throw new Errors.badRequestError(
        "same as current name,nothing to change"
      );
    }

    if (
      (!query.apartment_id && query.room_name) ||
      (query.apartment_id == foundItem.apartment_id && query.room_name)
    ) {
      const apartment_id = foundItem.apartment_id;
      const nameAlreadyExists = await roomDbServices.itemNameExists(
        query.room_name,
        apartment_id
      );

      if (nameAlreadyExists) {
        throw new Errors.badRequestError(
          "this name is already used for another room in this apartment"
        );
      }
    }

    if (!query.room_name && query.apartment_id == foundItem.apartment_id) {
      throw new Errors.badRequestError(
        "same as current apartment, nothing to change"
      );
    }

    if (!query.room_name && query.apartment_id) {
      const room_name = foundItem.room_name;
      const nameAlreadyExists = await roomDbServices.itemNameExists(
        room_name,
        query.apartment_id
      );

      if (nameAlreadyExists) {
        throw new Errors.badRequestError(
          "there is already a room with this name in the requested apartment"
        );
      }
    }

    if (query.room_name && query.apartment_id) {
      if (
        query.room_name == foundItem.room_name &&
        query.apartment_id == foundItem.apartment_id
      ) {
        throw new Errors.badRequestError("nothing to change");
      }

      const nameAlreadyExists = await roomDbServices.itemNameExists(
        query.room_name,
        query.apartment_id
      );

      if (nameAlreadyExists) {
        throw new Errors.badRequestError(
          "this name is already used for another room in requested apartment"
        );
      }
    }
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = roomServices;

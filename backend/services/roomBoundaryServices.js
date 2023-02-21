const Errors = require("../utils/errors");
const roomDbServices = require("./roomDbServices");
const roomBoundaryDbServices = require("./roomBoundaryDbServices");

const roomBoundaryServices = {};

roomBoundaryServices.preCreateCheck = async (query) => {
  try {
    const requiredEntries = [
      "room1_id",
      "boundary_type",
      "uvalue_id",
      "in_temp_id",
      "out_temp_id",
    ];
    // const recievedEntries = Object.keys(query);
    requiredEntries.forEach((item) => {
      // if (!recievedEntries.includes(key)) {
      if (!query[item] || query[item] == "") {
        throw new Errors.badRequestError(
          `incomplete input data! '${item}' is missing`
        );
      }
    });

    if (
      (query.boundary_type == "window" || query.boundary_type == "door") &&
      query.boundary_parent_id == ""
    ) {
      throw new Errors.badRequestError(
        "the Id for the wall or roof that holds this door/window should be filled in."
      );
    }

    if (
      (query?.length == undefined || query?.length == "") &&
      (query?.width == undefined || query?.width == "")
    ) {
      if (query?.area == undefined || query?.area == "") {
        throw new Errors.badRequestError(
          "enter either only the area or both dimensions!"
        );
      }
    }
    if (
      query?.length == undefined ||
      query?.length == "" ||
      query?.width == undefined ||
      query?.width == ""
    ) {
      if (query?.area != undefined || query?.area != "") {
        throw new Errors.badRequestError(
          "enter either only the area or only both dimensions!!"
        );
      }
    }

    if (query.area && query.length && query.width) {
      if (query.area !== query.length * query.width) {
        throw new Errors.badRequestError(
          "area ≠ lenght x width. enter either only the area or only the both dimensions"
        );
      }
    }

    const room = await roomDbServices.findItemByID(query.room1_id);
    if (!room) {
      throw new Errors.badRequestError("no room was found!");
    }

    return true;
  } catch (error) {
    throw error;
  }
};

roomBoundaryServices.preUpdateCheck = async (id, query) => {
  try {
    if (!query.room_name && query.apartment_id) {
      const regex = /\d+/gm;
      if (!regex.test(query?.apartment_id)) {
        throw new Errors.badRequestError(
          "the new apartment id cannot be an empty string"
        );
      }
    }

    let foundItem = await roomBoundaryDbServices.findItemByID(id);
    if (!foundItem) {
      throw new Errors.badRequestError("no room was found");
    }

    if (query.room_name && !query.apartment_id) {
      const apartment_id = foundItem.apartment_id;
      const nameAlreadyExists = await roomBoundaryDbServices.itemNameExists(
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
      const nameAlreadyExists = await roomBoundaryDbServices.itemNameExists(
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

      const nameAlreadyExists = await roomBoundaryDbServices.itemNameExists(
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

module.exports = roomBoundaryServices;

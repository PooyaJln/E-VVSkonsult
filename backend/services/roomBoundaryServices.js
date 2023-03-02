const Errors = require("../utils/errors");
const db = require("../models");
const roomDbServices = require("./roomDbServices");
const roomBoundaryDbServices = require("./roomBoundaryDbServices");

const roomBoundaryServices = {};

roomBoundaryServices.preCreateCheck = async (query) => {
  try {
    const requiredEntries = [
      "room1_id",
      "boundary_type",
      "uvalue_id",
      "out_temp_id",
      "has_openings",
      "groundConnected",
      "isBetween0_1",
      "isBetween1_6",
      "area",
    ];
    const requiredEntriesForOpening = [
      "room1_id",
      "boundary_type",
      "uvalue_id",
      "out_temp_id",
      "area",
      "boundary_parent_id",
    ];

    if (query.boundary_type == "window" || query.boundary_type == "door") {
      requiredEntriesForOpening.forEach((item) => {
        if (query[item] == undefined) {
          throw new Errors.badRequestError(
            `incomplete input data! '${item}' is missing`
          );
        }
      });
    } else {
      requiredEntries.forEach((item) => {
        // if (!recievedEntries.includes(key)) {
        if (query[item] == undefined) {
          throw new Errors.badRequestError(
            `incomplete input data! '${item}' is missing`
          );
        }
      });
    }

    if (
      (query.boundary_type == "window" || query.boundary_type == "door") &&
      query.boundary_parent_id == ""
    ) {
      throw new Errors.badRequestError(
        "the Id for the wall or roof that holds this door/window should be filled in."
      );
    }
    if (
      (query.boundary_type == "window" || query.boundary_type == "door") &&
      query.boundary_parent_id != ""
    ) {
      const parent = await db.roomBoundary.findByPk(query.boundary_parent_id);
      if (!parent) {
        throw new Errors.badRequestError(
          `this wall/roof to place this ${query.boundary_type} in is not created yet. you have to create it first or add this ${query.boundary_type} to an already existing wall/roof!`
        );
      }
    }

    if (
      (query?.area == undefined || query?.area == "") &&
      (query?.length == undefined || query?.length == "") &&
      (query?.width == undefined || query?.width == "")
    ) {
      throw new Errors.badRequestError(
        "both dimensions and area are empty. either enter the area or both dimensions!"
      );
    }
    if (
      query.groundConnected == true &&
      (query?.isBetween0_1 == undefined || query?.isBetween0_1 == "") &&
      (query?.isBetween1_6 == undefined || query?.isBetween1_6 == "")
    ) {
      if (query.boundary_type == "wall") {
        throw new Errors.badRequestError(
          "if this wall is partly or totally under ground you have to choose if it is from 0 to 1 meter or from 1 meter to 6 meter and enter the area for that part!"
        );
      }
      if (query.boundary_type == "floor") {
        throw new Errors.badRequestError(
          "if this floor is above ground you have to define if it is from 0 to 1 meter or from 1 meter to 6 meter and enter the area for that part!!"
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

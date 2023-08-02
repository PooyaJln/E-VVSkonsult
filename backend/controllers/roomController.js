const Errors = require("../utils/errors");
const roomDbServices = require("../services/roomDbServices");
const roomServices = require("../services/roomServices");

//----------------------------------------------------------------
const roomControllers = {};

// create new room
roomControllers.createItem = async (req, res, next) => {
  try {
    const preCreateCheck = await roomServices.preCreateCheck(req.body);
    if (preCreateCheck) {
      const newRoom = await roomDbServices.createItem(req.body);
      res.status(201).json(newRoom);
    }
  } catch (error) {
    next(error);
  }
};

//get a single room
roomControllers.getItemInfo = async (req, res, next) => {
  try {
    let room = await roomDbServices.itemsPublicInfo(req.params.room_id);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

roomControllers.getAllItems = async (req, res, next) => {
  try {
    const apartment_id = req.params.apartment_id;
    const allItems = await roomDbServices.getAllItems(apartment_id);
    res.status(200).json(allItems);
  } catch (error) {
    next(error);
  }
};

// update an room
roomControllers.updateItem = async (req, res, next) => {
  try {
    const id = req.params.room_id;
    const preUpdateCheck = await roomServices.preUpdateCheck(id, req.body);
    if (preUpdateCheck) {
      let updatedRoom = await roomDbServices.updateItem(
        req.params.room_id,
        req.body
      );
      return res.status(200).json(updatedRoom);
    }
  } catch (error) {
    next(error);
  }
};

//delete a single room
roomControllers.deleteItem = async (req, res, next) => {
  try {
    let deletedItem = await roomDbServices.deleteItem(req.params.room_id);
    res.status(200).json(deletedItem);
  } catch (error) {
    next(error);
  }
};

module.exports = roomControllers;

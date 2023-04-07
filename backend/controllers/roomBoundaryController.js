const Errors = require("../utils/errors");
const roomBoundaryDbServices = require("../services/roomBoundaryDbServices");
const roomBoundaryServices = require("../services/roomBoundaryServices");

//----------------------------------------------------------------
const roomBoundaryControllers = {};

// create new room
roomBoundaryControllers.createItem = async (req, res, next) => {
  try {
    const room1_id = req.params.room1_id;
    const preCreateCheck = await roomBoundaryServices.preCreateCheck({
      ...req.body,
      room1_id,
    });
    if (preCreateCheck) {
      const newRoomBoundary = await roomBoundaryDbServices.createItem({
        ...req.body,
        room1_id,
      });
      res.status(201).json(newRoomBoundary);
    }
  } catch (error) {
    next(error);
  }
};

//get a single room
roomBoundaryControllers.getItemInfo = async (req, res, next) => {
  try {
    let roomBoundary = await roomBoundaryDbServices.itemsPublicInfo(
      req.params.id
    );
    res.status(200).json(roomBoundary);
  } catch (error) {
    next(error);
  }
};

// update an room
roomBoundaryControllers.updateItem = async (req, res, next) => {
  try {
    const id = req.params.id;
    const preUpdateCheck = await roomBoundaryServices.preUpdateCheck(
      id,
      req.body
    );
    if (preUpdateCheck) {
      let updatedRoomBoundary = await roomBoundaryDbServices.updateItem(
        req.params.id,
        req.body
      );
      return res.status(200).json(updatedRoomBoundary);
    }
  } catch (error) {
    next(error);
  }
};

//delete a single room
roomBoundaryControllers.deleteItem = async (req, res, next) => {
  try {
    let message = await roomBoundaryDbServices.deleteItem(req.params.id);
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};

module.exports = roomBoundaryControllers;

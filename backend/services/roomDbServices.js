const Errors = require("../utils/errors");
const db = require("../models");
const roomBoundaryDbServices = require("./roomBoundaryDbServices");

const roomDbServices = {};

roomDbServices.findItemByID = async (id) => {
  try {
    const item = await db.room.findOne({
      where: {
        room_id: id,
      },
    });
    if (item) return item;
    return false;
  } catch (error) {
    throw error;
  }
};

roomDbServices.itemsPublicInfo = async (id) => {
  try {
    const item = await db.room.findOne({
      where: {
        room_id: id,
      },
      attributes: ["room_name"],
      include: [
        {
          model: db.temperature,
          attributes: ["temperature_id", "temperature_value"],
        },
        {
          model: db.apartment,
          attributes: ["apartment_id", "apartment_name"],
        },
      ],
    });
    if (item) return item;
    return false;
  } catch (error) {
    throw error;
  }
};

roomDbServices.itemNameExists = async (_name, id) => {
  try {
    const item = await db.room.findOne({
      where: {
        room_name: _name,
        apartment_id: id,
      },
    });
    if (item) return item;
    return false;
  } catch (error) {
    throw error;
  }
};

roomDbServices.createItem = async (query) => {
  try {
    const newItem = await db.room.create(query);
    const newId = newItem.room_id;
    const item = await roomDbServices.itemsPublicInfo(newId);
    return item;
  } catch (error) {
    throw error;
  }
};

roomDbServices.getItemAndchildren = async (id) => {
  try {
    let foundItem = await db.room.findByPk(id);
    if (!foundItem) {
      throw new Errors.badRequestError("no room was found");
    }
    const room_name = foundItem.room_name;

    let itemsArray = [];
    const items = await db.roomBoundary.findAll({
      where: {
        room1_id: id,
      },
      // attributes: ["boundary_id", "boundary_name"],
    });

    if (items.length == 0) {
      return { room: room_name, boundaries: [], roomHeatLoss: 0 };
    }
    items.map((item) => {
      itemsArray.push(item["boundary_name"]);
    });
    const totalHeatLoss = await roomDbServices.calculateRoomsHeatLoss(items);

    if (itemsArray)
      return {
        room: room_name,
        boundaries: itemsArray,
        roomHeatLoss: totalHeatLoss,
      };

    return false;
  } catch (error) {
    throw error;
  }
};

roomDbServices.calculateRoomsHeatLoss = async (arr) => {
  try {
    const roomBoundaryItems = arr;

    const totalHeatLoss = await (async () => {
      let roomHeatLoss = 0;
      for (let item of roomBoundaryItems) {
        roomHeatLoss += await roomBoundaryDbServices.getItemsHeatLoss(item);
      }
      return roomHeatLoss;
    })();

    if (roomBoundaryItems) return totalHeatLoss;
    return 0;
  } catch (error) {
    throw error;
  }
};

roomDbServices.updateItem = async (id, query) => {
  try {
    await db.room.update(query, {
      where: {
        room_id: id,
      },
    });

    const updatedItem = await roomDbServices.itemsPublicInfo(id);

    return updatedItem;
  } catch (error) {
    throw error;
  }
};

roomDbServices.deleteItem = async (id) => {
  try {
    let foundItem = await roomDbServices.findItemByID(id);
    if (!foundItem) {
      throw new Errors.badRequestError("no room was found");
    }
    const room_name = foundItem.room_name;
    const apartment = await db.apartment.findOne({
      where: {
        apartment_id: foundItem.apartment_id,
      },
    });
    const apartment_name = apartment.apartment_name;

    await db.room.destroy({
      where: {
        room_id: id,
      },
    });

    const message = `the room ${room_name} in apartment ${apartment_name} is deleted`;
    return message;
  } catch (error) {
    throw error;
  }
};

module.exports = roomDbServices;

const Errors = require("../utils/errors");
const db = require("../models");

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
    let foundItem = await roomDbServices.findItemByID(id);
    if (!foundItem) {
      throw new Errors.badRequestError("no room was found");
    }
    const room_name = foundItem.room_name;

    let itemsArray = [];
    const items = await db.room.findAll({
      where: {
        room_id: id,
      },
      attributes: ["room_name"],
      raw: true,
      include: {
        model: db.roomBoundary,
        attributes: ["boundary_name"],
        raw: true,
      },
    });
    if (
      items.length == 1 &&
      items[0]["roomBooundarys.boundary_name"] === null
    ) {
      return { room: room_name, boundaries: [] };
    }
    items.map((item) => {
      itemsArray.push(item["roomBooundarys.boundary_name"]);
    });

    if (itemsArray) return { room: room_name, boundaries: itemsArray };

    return false;
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

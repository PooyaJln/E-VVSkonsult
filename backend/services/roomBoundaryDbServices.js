const Errors = require("../utils/errors");
const db = require("../models");

const roomBoundaryDb = {};

roomBoundaryDb.findItemByID = async (id) => {
  try {
    const item = await db.roomBoundary.findOne({
      where: {
        boundary_id: id,
      },
    });
    if (item) return item;
    return false;
  } catch (error) {
    throw error;
  }
};

roomBoundaryDb.itemsPublicInfo = async (id) => {
  try {
    const item = await db.roomBoundary.findOne({
      where: {
        boundary_id: id,
      },
      attributes: [
        "boundary_name",
        "room1_id",
        "boundary_type",
        "uvalue_id",
        "area",
        "opening_area",
        "net_area",
        "in_temp_id",
        "out_temp_id",
        "trans_heat_loss",
        "infilt_heat_loss",
        "total_heat_loss",
      ],
      include: [
        {
          model: db.room,
          attributes: ["room_id", "room_name"],
        },
        {
          model: db.temperature,
          attributes: [
            "temperature_id",
            "temperature_name",
            "temperature_value",
          ],
        },
        {
          model: db.component,
          attributes: [
            "component_id",
            "component_name",
            "component_categ",
            "component_uvalue",
            "component_area",
            "component_qinf",
          ],
        },
      ],
    });
    if (item) return item;
    return false;
  } catch (error) {
    throw error;
  }
};

roomBoundaryDb.itemNameExists = async (_name, id) => {
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

roomBoundaryDb.createItem = async (query) => {
  try {
    const newItem = await db.roomBoundary.create(query);
    const newId = newItem.roomBoundary_id;
    const item = await roomBoundaryDb.itemsPublicInfo(newId);
    return item;
  } catch (error) {
    throw error;
  }
};

roomBoundaryDb.getItemAndchildren = async (id) => {
  try {
    let foundItem = await roomBoundaryDb.findItemByID(id);
    if (!foundItem) {
      throw new Errors.badRequestError("no room boundary was found");
    }
    const roomBoundary_name = foundItem.room_name;

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

    if (itemsArray)
      return { roomBoundary: roomBoundary_name, boundaries: itemsArray };

    return false;
  } catch (error) {
    throw error;
  }
};

roomBoundaryDb.updateItem = async (id, query) => {
  try {
    await db.roomBoundary.update(query, {
      where: {
        boundary_id: id,
      },
    });

    const updatedItem = await roomBoundaryDb.itemsPublicInfo(id);

    return updatedItem;
  } catch (error) {
    throw error;
  }
};

roomBoundaryDb.deleteItem = async (id) => {
  try {
    let foundItem = await roomBoundaryDb.findItemByID(id);
    if (!foundItem) {
      throw new Errors.badRequestError("no room boundary was found");
    }
    const roomBoundary_name = foundItem.boundary_name;
    const room = await db.room.findOne({
      where: {
        room_id: foundItem.room1_id,
      },
    });
    const room_name = room.room_name;

    await db.roomBoundary.destroy({
      where: {
        boundary_id: id,
      },
    });

    const message = `the room ${roomBoundary_name} in apartment ${room_name} is deleted`;
    return message;
  } catch (error) {
    throw error;
  }
};
module.exports = roomBoundaryDb;

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
      attributes: ["room_id", "room_name"],
      include: [
        {
          model: db.temperature,
          attributes: ["temperature_id", "temperature_value"],
        },
        // {
        //   model: db.apartment,
        //   attributes: ["apartment_id", "apartment_name"],
        // },
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

roomDbServices.getAllItems = async (id) => {
  try {
    const apartment = await db.apartment.findByPk(id);
    if (!apartment)
      throw Errors.badRequestError("this apartment was not found");
    let results = { apartment_name: apartment.apartment_name };
    let itemsArray = [];
    // let items = await db.project.findAll({
    //   where: {
    //     project_id: id,
    //   },
    //   attributes: ["project_name"],
    //   raw: true,
    //   include: {
    //     model: db.buildng,
    //     attributes: ["storey_name"],
    //     raw: true,
    //   },
    // });

    let items = await db.room.findAll({
      where: {
        apartment_id: id,
      },
      attributes: ["room_id", "room_name"],
    });

    if (items.length == 1 && items[0]["room.room_name"] === null) {
      throw new Errors.notFoundError("no room was found");
    }
    items.map((item) => {
      itemsArray.push(item["room_name"]);
    });

    if (items) return { ...results, rooms: items };
    return false;
  } catch (error) {
    throw error;
  }
};

roomDbServices.getItemAndchildren = async (id) => {
  try {
    let foundItem = await db.room.findOne({
      where: {
        room_id: id,
      },
      attributes: ["room_id", "room_name"],
      raw: true,
    });
    if (!foundItem) {
      throw new Errors.badRequestError("no room was found");
    }

    const items = await db.roomBoundary.findAll({
      where: {
        room1_id: id,
      },
      // attributes: ["boundary_id", "boundary_name"],
      // raw: true,
    });

    const totalHeatLoss = await roomDbServices.calculateRoomsHeatLoss(items);

    if (items)
      return {
        ...foundItem,
        boundaries: items,
        roomHeatLoss: totalHeatLoss.toFixed(1),
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

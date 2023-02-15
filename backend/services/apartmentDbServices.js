const Errors = require("../utils/errors");
const db = require("../models");

const apartmentDbServices = {};

apartmentDbServices.findItemByID = async (id) => {
  try {
    const item = await db.apartment.findOne({
      where: {
        apartment_id: id,
      },
    });
    if (item) return item;
    return false;
  } catch (error) {
    throw error;
  }
};

apartmentDbServices.itemsPublicInfo = async (id) => {
  try {
    const item = await db.apartment.findOne({
      where: {
        apartment_id: id,
      },
      attributes: ["apartment_name", "storey_id"],
    });
    if (item) return item;
    return false;
  } catch (error) {
    throw error;
  }
};

apartmentDbServices.itemNameExists = async (_name, id) => {
  try {
    const item = await db.apartment.findOne({
      where: {
        apartment_name: _name,
        storey_id: id,
      },
    });
    if (item) return item;
    return false;
  } catch (error) {
    throw error;
  }
};

apartmentDbServices.createItem = async (query) => {
  try {
    const newItem = await db.apartment.create(query);
    const newId = newItem.apartment_id;
    const item = await apartmentDbServices.itemsPublicInfo(newId);
    return item;
  } catch (error) {
    throw error;
  }
};

apartmentDbServices.getItemAndchildren = async (id) => {
  try {
    let foundItem = await apartmentDbServices.findItemByID(id);
    if (!foundItem) {
      throw new Errors.badRequestError("no apartment was found");
    }
    const apartment_name = foundItem.apartment_name;

    let itemsArray = [];
    const items = await db.apartment.findAll({
      where: {
        apartment_id: id,
      },
      attributes: ["apartment_name"],
      raw: true,
      include: {
        model: db.room,
        attributes: ["room_name"],
        raw: true,
      },
    });
    if (items.length == 1 && items[0]["rooms.room_name"] === null) {
      return { apartment: apartment_name, rooms: [] };
    }
    items.map((item) => {
      itemsArray.push(item["rooms.room_name"]);
    });

    if (itemsArray) return { apartment: apartment_name, rooms: itemsArray };

    return false;
  } catch (error) {
    throw error;
  }
};

apartmentDbServices.updateItem = async (id, query) => {
  try {
    await db.apartment.update(query, {
      where: {
        apartment_id: id,
      },
    });

    const updatedItem = await apartmentDbServices.itemsPublicInfo(id);

    return updatedItem;
  } catch (error) {
    throw error;
  }
};

apartmentDbServices.deleteItem = async (id) => {
  try {
    let foundItem = await apartmentDbServices.findItemByID(id);
    if (!foundItem) {
      throw new Errors.badRequestError("no apartment was found");
    }
    const apartment_name = foundItem.apartment_name;
    const storey = await db.storey.findOne({
      where: {
        storey_id: foundItem.storey_id,
      },
    });
    const storey_name = storey.storey_name;

    await db.apartment.destroy({
      where: {
        apartment_id: id,
      },
    });

    const message = `apartment ${apartment_name} in storey ${storey_name} is deleted`;
    return message;
  } catch (error) {
    throw error;
  }
};
module.exports = apartmentDbServices;

const Errors = require("../utils/errors");
const db = require("../models");

const storeyDbServices = {};

storeyDbServices.findItemByID = async (id) => {
  try {
    const item = await db.storey.findOne({
      where: {
        storey_id: id,
      },
    });
    if (item) return item;
    return false;
  } catch (error) {
    throw error;
  }
};

storeyDbServices.itemsPublicInfo = async (id) => {
  try {
    const item = await db.storey.findOne({
      where: {
        storey_id: id,
      },
      attributes: ["storey_id", "storey_name"],
    });
    if (item) return item;
    return false;
  } catch (error) {
    throw error;
  }
};

storeyDbServices.itemNameExists = async (_name, id) => {
  try {
    const item = await db.storey.findOne({
      where: {
        storey_name: _name,
        building_id: id,
      },
    });
    if (item) return item;
    return false;
  } catch (error) {
    throw error;
  }
};

storeyDbServices.createItem = async (query) => {
  try {
    const newItem = await db.storey.create(query);
    const newId = newItem.storey_id;
    const item = await storeyDbServices.itemsPublicInfo(newId);
    return item;
  } catch (error) {
    throw error;
  }
};

storeyDbServices.getAllItems = async (id) => {
  try {
    const building = await db.building.findByPk(id);
    if (!building) throw Errors.badRequestError("this building was not found");
    let results = { building_name: building.building_name };
    let itemsArray = [];
    // let items = await db.project.findAll({
    //   where: {
    //     project_id: id,
    //   },
    //   attributes: ["project_name"],
    //   raw: true,
    //   include: {
    //     model: db.buildng,
    //     attributes: ["building_name"],
    //     raw: true,
    //   },
    // });

    let items = await db.storey.findAll({
      where: {
        building_id: id,
      },
      attributes: ["storey_id", "storey_name"],
    });

    if (items.length == 1 && items[0]["storeys.storey_name"] === null) {
      throw new Errors.notFoundError("no storey was found");
    }
    items.map((item) => {
      itemsArray.push(item["storey_name"]);
    });

    if (items) return { ...results, stories: items };
    return false;
  } catch (error) {
    throw error;
  }
};

storeyDbServices.getItemAndchildren = async (id) => {
  try {
    let foundItem = await storeyDbServices.findItemByID(id);
    if (!foundItem) {
      throw new Errors.badRequestError("no storey was found");
    }
    const storey_name = foundItem.storey_name;

    let itemsArray = [];
    const items = await db.storey.findAll({
      where: {
        storey_id: id,
      },
      attributes: ["storey_name"],
      raw: true,
      include: {
        model: db.apartment,
        attributes: ["apartment_name"],
        raw: true,
      },
    });
    if (items.length == 1 && items[0]["apartments.apartment_name"] === null) {
      return { storey: storey_name, apartments: [] };
    }
    items.map((item) => {
      itemsArray.push(item["apartments.apartment_name"]);
    });

    if (itemsArray) return { storey: storey_name, apartments: itemsArray };

    return false;
  } catch (error) {
    throw error;
  }
};

storeyDbServices.updateItem = async (id, query) => {
  try {
    await db.storey.update(query, {
      where: {
        storey_id: id,
      },
    });

    const updatedItem = await db.storey.findOne({
      where: {
        storey_id: id,
      },
    });

    return updatedItem;
  } catch (error) {
    throw error;
  }
};

storeyDbServices.deleteItem = async (id) => {
  try {
    let foundItem = await db.storey.findOne({
      where: {
        storey_id: id,
      },
    });
    if (!foundItem) {
      throw new Errors.badRequestError("no storey was found");
    }
    const storey_name = foundItem.storey_name;
    const building = await db.building.findOne({
      where: {
        building_id: foundItem.building_id,
      },
    });
    const building_name = building.building_name;

    await db.storey.destroy({
      where: {
        storey_id: id,
      },
    });

    const message = `Storey ${storey_name} in building ${building_name} is deleted`;
    return foundItem;
  } catch (error) {
    throw error;
  }
};
module.exports = storeyDbServices;

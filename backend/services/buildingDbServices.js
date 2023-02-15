const Errors = require("../utils/errors");
const db = require("../models");

const buildingDbServices = {};

buildingDbServices.findItemByID = async (id) => {
  try {
    const item = await db.building.findOne({
      where: {
        building_id: id,
      },
    });
    if (item) return item;
    return false;
  } catch (error) {
    throw error;
  }
};

buildingDbServices.itemsPublicInfo = async (id) => {
  try {
    const item = await db.building.findOne({
      where: {
        building_id: id,
      },
      attributes: ["building_name", "project_id"],
    });
    if (item) return item;
    return false;
  } catch (error) {
    throw error;
  }
};

buildingDbServices.itemNameExists = async (_name, id) => {
  try {
    const item = await db.building.findOne({
      where: {
        building_name: _name,
        project_id: id,
      },
    });
    if (item) return item;
    return false;
  } catch (error) {
    throw error;
  }
};

buildingDbServices.getAllItems = async (id) => {
  try {
    let itemsArray = [];
    let items = await db.project.findAll({
      where: {
        project_id: id,
      },
      attributes: ["project_name"],
      raw: true,
      include: {
        model: db.buildng,
        attributes: ["building_name"],
        raw: true,
      },
    });

    if (items.length == 1 && items[0]["buildings.building_name"] === null) {
      throw new Errors.notFoundError("no building was found");
    }
    items.map((item) => {
      itemsArray.push(item["buildings.building_name"]);
    });

    if (itemsArray) return itemsArray;
    return false;
  } catch (error) {
    throw error;
  }
};

buildingDbServices.createItem = async (_name, id) => {
  try {
    const newItem = await db.building.create({
      building_name: _name,
      project_id: id,
    });
    const newId = newItem.building_id;
    const item = await buildingDbServices.itemsPublicInfo(newId);
    return item;
  } catch (error) {
    throw error;
  }
};

buildingDbServices.getItemAndchildren = async (id) => {
  try {
    let foundItem = await buildingDbServices.findItemByID(id);
    if (!foundItem) {
      throw new Errors.badRequestError("no building was found");
    }
    const building_name = foundItem.building_name;

    let itemsArray = [];
    const items = await db.building.findAll({
      where: {
        building_id: id,
      },
      attributes: ["building_name"],
      raw: true,
      include: {
        model: db.storey,
        attributes: ["storey_name"],
        raw: true,
      },
    });
    if (items.length == 1 && items[0]["storeys.storey_name"] === null) {
      return { building: building_name, stories: [] };
    }
    items.map((item) => {
      itemsArray.push(item["storeys.storey_name"]);
    });

    if (itemsArray) return { building: building_name, stories: itemsArray };

    return false;
  } catch (error) {
    throw error;
  }
};

buildingDbServices.preUpdateCheck = async (id, query) => {
  try {
    if (query.newBuilding_name?.length == 0) {
      throw new Errors.badRequestError(
        "the new name cannot be an empty string"
      );
    }
    let foundItem = await buildingDbServices.findItemByID(id);
    if (!foundItem) {
      throw new Errors.badRequestError("no building was found");
    }
    if (
      foundItem.building_name == query.newBuilding_name &&
      foundItem.project_id == query.newProject_id
    ) {
      throw new Errors.badRequestError("nothing to change");
    }
    const nameAlreadyExists = await buildingDbServices.itemNameExists(
      query.newBuilding_name,
      query.newProject_id
    );

    if (nameAlreadyExists) {
      throw new Errors.badRequestError(
        "this name is already used for another building"
      );
    }
    return true;
  } catch (error) {
    throw error;
  }
};

buildingDbServices.updateItem = async (id, query) => {
  try {
    const preUpdateCheck = await buildingDbServices.preUpdateCheck(id, query);
    if (preUpdateCheck) {
      await db.building.update(
        {
          building_name: query.newBuilding_name,
          project_id: query.newProject_id,
        },
        {
          where: {
            building_id: id,
          },
        }
      );

      const updatedItem = await buildingDbServices.itemsPublicInfo(id);

      return updatedItem;
    }
  } catch (error) {
    throw error;
  }
};

buildingDbServices.deleteItem = async (id) => {
  try {
    let foundItem = await buildingDbServices.findItemByID(id);
    if (!foundItem) {
      throw new Errors.badRequestError("no building was found");
    }
    const building_name = foundItem.building_name;

    await db.building.destroy({
      where: {
        building_id: id,
      },
    });

    const message = `building ${building_name} is deleted`;
    return message;
  } catch (error) {
    throw error;
  }
};
module.exports = buildingDbServices;

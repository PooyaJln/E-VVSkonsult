const Errors = require("../utils/errors");
const db = require("../models");

const componentDbServices = {};

componentDbServices.findItemByID = async (id) => {
  try {
    const item = await db.component.findOne({
      where: {
        component_id: id,
      },
    });
    if (item) return item;
    return false;
  } catch (error) {
    throw error;
  }
};

componentDbServices.itemsPublicInfo = async (id) => {
  try {
    const item = await db.component.findOne({
      where: {
        component_id: id,
      },
      attributes: [
        "component_id",
        "component_name",
        "component_categ",
        "component_uvalue",
        "component_area",
      ],
      include: {
        model: db.thermalParameter,
        attributes: ["parameter_name", "parameter_value"],
      },
    });
    if (item) return item;
    return false;
  } catch (error) {
    throw error;
  }
};

componentDbServices.getItem = async (id) => {
  try {
    let item = await componentDbServices.itemsPublicInfo(id);
    if (!item) throw new Errors.badRequestError("this component was not found");
    return item;
  } catch (error) {
    throw error;
  }
};

componentDbServices.itemNameExists = async (query) => {
  try {
    const item = await db.component.findOne({
      where: {
        project_id: query.project_id,
        component_name: query.component_name,
      },
    });
    if (item) return item;
    return false;
  } catch (error) {
    throw error;
  }
};

componentDbServices.createItem = async (query) => {
  try {
    const newItem = await db.component.create(query);
    const newId = newItem.component_id;
    const item = await componentDbServices.itemsPublicInfo(newId);
    return item;
  } catch (error) {
    throw error;
  }
};

componentDbServices.getAllItems = async (id) => {
  try {
    const components = await db.component.findAll({
      where: {
        project_id: id,
      },
      attributes: [
        "component_id",
        "component_name",
        "component_categ",
        "component_uvalue",
        "component_area",
      ],
      include: {
        model: db.thermalParameter,
        attributes: ["parameter_id", "parameter_name", "parameter_value"],
      },
    });
    return components;
  } catch (error) {
    throw error;
  }
};

componentDbServices.updateItem = async (id, query) => {
  try {
    await db.component.update(query, {
      where: {
        component_id: id,
      },
    });

    const updatedItem = await componentDbServices.itemsPublicInfo(id);

    return updatedItem;
  } catch (error) {
    throw error;
  }
};

componentDbServices.deleteItem = async (id) => {
  try {
    let foundItem = await componentDbServices.findItemByID(id);
    if (!foundItem) {
      throw new Errors.badRequestError("no component was found");
    }
    const component_name = foundItem.component_name;
    await db.component.destroy({
      where: {
        component_id: id,
      },
    });

    const message = `the component with name ${component_name} is deleted`;
    return foundItem;
  } catch (error) {
    throw error;
  }
};
module.exports = componentDbServices;

const Errors = require("../utils/errors");
const db = require("../models");

const projectDbServices = {};

projectDbServices.findItemByID = async (id) => {
  try {
    const item = await db.project.findOne({
      where: {
        project_id: id,
      },
    });
    if (item) {
      return item;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

projectDbServices.itemsPublicInfo = async (id) => {
  try {
    const item = await db.project.findOne({
      where: {
        project_id: id,
      },
      attributes: ["project_name", "owner_id"],
    });
    if (item) return item;
    return false;
  } catch (error) {
    throw error;
  }
};

projectDbServices.itemNameExists = async (_name, id) => {
  try {
    const item = await db.project.findOne({
      where: {
        project_name: _name,
        owner_id: id,
      },
    });
    if (item) return item;
    return false;
  } catch (error) {
    throw error;
  }
};

projectDbServices.getAllItems = async (id) => {
  try {
    let itemsArray = [];
    let items = await db.user.findAll({
      where: {
        user_id: id,
      },
      attributes: ["user_email"],
      raw: true,
      include: {
        model: db.project,
        attributes: ["project_name"],
        raw: true,
      },
    });

    if (items.length == 1 && items[0]["projects.project_name"] === null) {
      throw new Errors.notFoundError("no project was found");
    }
    items.map((item) => {
      itemsArray.push(item["projects.project_name"]);
    });

    if (itemsArray) return itemsArray;
    return false;
  } catch (error) {
    throw error;
  }
};

projectDbServices.createItem = async (query) => {
  try {
    const newProject = await db.project.create(query);
    const newId = newProject.project_id;
    const project = await projectDbServices.itemsPublicInfo(newId);
    return project;
  } catch (error) {
    throw error;
  }
};

projectDbServices.updateItem = async (id, query) => {
  try {
    const preUpdateCheck = await projectDbServices.preUpdateCheck(id, query);
    if (preUpdateCheck) {
      await db.project.update(
        { project_name: query.newProject_name, owner_id: query.newOwner_id },
        {
          where: {
            project_id: id,
          },
        }
      );

      const project = await projectDbServices.itemsPublicInfo(id);

      return project;
    }
  } catch (error) {
    throw error;
  }
};

projectDbServices.getItemAndchildren = async (id) => {
  try {
    let foundItem = await projectDbServices.findItemByID(id);
    if (!foundItem) {
      throw new Errors.badRequestError("no project was found");
    }
    const project_name = foundItem.project_name;

    let itemsArray = [];
    const items = await db.project.findAll({
      where: {
        project_id: id,
      },
      attributes: ["project_name"],
      raw: true,
      include: {
        model: db.building,
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

    if (itemsArray) return { project: project_name, buildings: itemsArray };

    return false;
  } catch (error) {
    throw error;
  }
};

projectDbServices.deleteItem = async (id) => {
  try {
    let foundItem = await projectDbServices.findItemByID(id);
    if (!foundItem) {
      throw new Errors.badRequestError("no project was found");
    }
    const project_name = foundItem.project_name;

    await db.project.destroy({
      where: {
        project_id: id,
      },
    });

    const message = `the ${project_name} is deleted`;
    return message;
  } catch (error) {
    throw error;
  }
};
module.exports = projectDbServices;

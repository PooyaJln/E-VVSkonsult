const Errors = require("../utils/errors");
const validator = require("validator");
const Project = require("../models/projectModel");
const { poolPromise, pool, prisma } = require("../connections/dbConnection");
const db = require("../models");
const { query } = require("express");

const projectServices = {};

projectServices.findItemByID = async (id) => {
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

projectServices.itemsPublicInfo = async (id) => {
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

projectServices.itemNameExists = async (_name, id) => {
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

projectServices.getAllItems = async (id) => {
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

projectServices.createItem = async (p_name, id) => {
  try {
    const newProject = await db.project.create({
      project_name: p_name,
      owner_id: id,
    });
    const newId = newProject.project_id;
    const project = await projectServices.itemsPublicInfo(newId);
    return project;
  } catch (error) {
    throw error;
  }
};

projectServices.updateItem = async (id, query) => {
  try {
    let foundItem = await projectServices.findItemByID(id);
    if (!foundItem) {
      throw new Errors.badRequestError("no project was found");
    }

    const { project_name, owner_id } = query;
    await db.project.update(
      { project_name, owner_id },
      {
        where: {
          project_id: id,
        },
      }
    );

    const project = await projectServices.itemsPublicInfo(id);

    return project;
  } catch (error) {
    throw error;
  }
};

projectServices.getItemAndchildren = async (id) => {
  try {
    let foundItem = await projectServices.findItemByID(id);
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

projectServices.deleteItem = async (id) => {
  try {
    let foundItem = await projectServices.findItemByID(id);
    if (!foundItem) {
      throw new Errors.badRequestError("no project was found");
    }
    const project_name = foundItem.project_name;

    const deletedItem = await db.project.destroy({
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
module.exports = projectServices;

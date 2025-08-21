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
      attributes: ["project_id", "project_name"],
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
    // let items = await db.user.findAll({
    //   where: {
    //     user_id: id,
    //   },
    //   attributes: ["user_email"],
    //   raw: true,
    //   include: {
    //     model: db.project,
    //     attributes: ["project_name"],
    //     raw: true,
    //   },
    // });
    items = await db.project.findAll({
      // where: {
      //   user_id: id,
      // },
      attributes: ["project_id", "project_name"],

      // include: {
      //   model: db.project,
      //   attributes: ["project_name"],
      //   raw: true,
      // },
    });

    if (items.length == 1 && items[0]["projects.project_name"] === null) {
      throw new Errors.notFoundError("no project was found");
    }
    items.map((item) => {
      itemsArray.push(item["project_name"]);
    });

    // if (itemsArray) return itemsArray;
    if (items) return items;
    return false;
  } catch (error) {
    throw error;
  }
};
projectDbServices.getAllData = async (id) => {
  try {
    let _project = await db.project.findOne({
      where: {
        project_id: id,
      },
      attributes: ["project_id", "project_name"],
      include: [
        {
          model: db.building,
          attributes: ["building_id", "building_name"],
        },
        {
          model: db.thermalParameter,
          attributes: ["parameter_id", "parameter_name", "parameter_value"],
        },
        {
          model: db.component,
          attributes: [
            "component_id",
            "component_name",
            "component_categ",
            "component_uvalue",
          ],
          include: {
            model: db.thermalParameter,
            attributes: ["parameter_id", "parameter_value"],
          },
        },
      ],
    });

    if (
      _project.length == 1 &&
      _project[0]["buildings.building_name"] === null
    ) {
      throw new Errors.notFoundError("no building was found");
    }
    // _project.map((item) => {
    //   itemsArray.push(item["building_name"]);
    // });
    if (!_project) throw Errors.badRequestError("this project was not found");

    if (_project) return _project;
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
    await db.project.update(query, {
      where: {
        project_id: id,
      },
    });

    const updatedItem = await projectDbServices.itemsPublicInfo(id);

    return updatedItem;
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
    // const items = await db.project.findAll({
    //   where: {
    //     project_id: id,
    //   },
    //   attributes: ["project_name"],
    //   raw: true,
    //   include: {
    //     model: db.building,
    //     attributes: ["building_name"],
    //     raw: true,
    //   },
    // });
    const items = await db.building.findAll({
      where: {
        project_id: id,
      },
      attributes: ["building_id", "building_name"],
      raw: true,
    });
    if (items.length == 1 && items[0]["buildings.building_name"] === null) {
      throw new Errors.notFoundError("no building was found");
    }
    // items.map((item) => {
    //   itemsArray.push(item["buildings.building_name"]);
    // });

    // if (itemsArray) return { project: project_name, buildings: itemsArray };
    if (items) return { project: project_name, buildings: items };

    return false;
  } catch (error) {
    throw error;
  }
};

projectDbServices.deleteItem = async (id) => {
  try {
    let foundItem = await db.project.findOne({
      where: {
        project_id: id,
      },
    });
    if (!foundItem) {
      throw new Errors.badRequestError("no project was found");
    }
    const project_name = foundItem.project_name;

    await db.project.destroy({
      where: {
        project_id: id,
      },
    });

    // const message = `the ${project_name} is deleted`;
    return foundItem;
  } catch (error) {
    throw error;
  }
};
module.exports = projectDbServices;

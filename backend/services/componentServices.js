const Errors = require("../utils/errors");
const componentDbServices = require("./componentDbServices");

const componentServices = {};

componentServices.preCreateCheck = async (query) => {
  try {
    if (query.component_name?.length == 0) {
      throw new Errors.badRequestError(
        "the new name cannot be an empty string"
      );
    }
    if (
      !query.component_name ||
      !query.component_categ ||
      !query.component_uvalue
    ) {
      throw new Errors.badRequestError("incomplete input data");
    }

    if (query.component_name) {
      const componentNameExists = await componentDbServices.itemNameExists(
        query
      );
      if (componentNameExists) {
        throw new Errors.badRequestError("this name already exists.");
      }
    }
    return true;
  } catch (error) {
    throw error;
  }
};

componentServices.preUpdateCheck = async (id, query) => {
  try {
    if (
      query.component_name?.length == 0 ||
      query.component_categ?.length == 0
    ) {
      throw new Errors.badRequestError(
        "the new name or category cannot be an empty string"
      );
    }
    const allowedCategory = ["window", "door", "wall", "roof/floor slab"];
    if (
      query.component_categ?.length > 0 &&
      !allowedCategory.includes(query.component_categ)
    ) {
      throw new Errors.badRequestError(
        `for the category, you can only choose among 'window', 'door', 'wall' or 'roof/floor slab'`
      );
    }
    let foundItem = await componentDbServices.findItemByID(id);
    if (!foundItem) {
      throw new Errors.badRequestError("no component was found");
    }
    let columnsToUpdate = [];
    const queryKeys = Object.keys(query);
    // if (Object.keys(query)?.includes("component_name")) {
    //   const nameAlreadyExists = await componentDbServices.itemNameExists(
    //     query.component_name
    //   );

    //   if (nameAlreadyExists?.component_id != id) {
    //     throw new Errors.badRequestError(
    //       "this name is already used for another component."
    //     );
    //   }
    // }
    const nameAlreadyExists = await componentDbServices.itemNameExists({
      ...query,
      project_id: foundItem.project_id,
    });

    if (nameAlreadyExists?.component_id != id) {
      throw new Errors.badRequestError(
        "this name is already used for another component."
      );
    }

    // if (
    //   !query.component_name &&
    //   query.component_value == foundItem.component_value
    // ) {
    //   const component_name = foundItem.component_name;
    //   const nameAlreadyExists = await componentDbServices.itemNameExists(
    //     component_name,
    //     query.component_value
    //   );

    //   if (nameAlreadyExists) {
    //     throw new Errors.badRequestError("no change in component happened");
    //   }
    // }

    // if (query.component_name && query.component_value) {
    //   const nameAlreadyExists = await componentDbServices.itemNameExists(
    //     query.component_name,
    //     query.component_value
    //   );

    //   if (nameAlreadyExists) {
    //     throw new Errors.badRequestError(
    //       "this name is already used for another component !2"
    //     );
    //   }
    // }
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = componentServices;

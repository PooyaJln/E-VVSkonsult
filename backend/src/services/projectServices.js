const Errors = require("../utils/errors");
const projectDbServices = require("./projectDbServices");
const userDbServices = require("./userDbServices");

const projectServices = {};

projectServices.preCreateCheck = async (query) => {
  try {
    if (query.project_name?.length == 0) {
      throw new Errors.badRequestError(
        "the new name cannot be an empty string"
      );
    }
    if (!query.project_name || !query.owner_id) {
      throw new Errors.badRequestError("incomplete input data");
    }
    const user = await userDbServices.findItemByID(query.owner_id);
    if (!user) {
      throw new Errors.badRequestError("no user was found!");
    }
    const projectNameExists = await projectDbServices.itemNameExists(
      query.project_name,
      query.owner_id
    );
    if (projectNameExists) {
      throw new Errors.badRequestError("this name is already used.");
    }
    return true;
  } catch (error) {
    throw error;
  }
};

projectServices.preUpdateCheck = async (id, query) => {
  try {
    if (query.project_name?.length == 0) {
      throw new Errors.badRequestError(
        "the new name cannot be an empty string"
      );
    }
    let foundItem = await projectDbServices.findItemByID(id);
    if (!foundItem) {
      throw new Errors.badRequestError("no project was found");
    }

    // if (!query.owner_id && query.project_name == foundItem.project_name) {
    //   throw new Errors.badRequestError(
    //     "same as current name,nothing to change"
    //   );
    // }

    if (!query.owner_id && query.project_name) {
      const owner_id = foundItem.owner_id;
      const nameAlreadyExists = await projectDbServices.itemNameExists(
        query.project_name,
        owner_id
      );

      if (nameAlreadyExists && query.project_name != foundItem.project_name) {
        throw new Errors.badRequestError(
          "this name is already used for another project"
        );
      }
    }

    // if (!query.project_name && query.owner_id == foundItem.owner_id) {
    //   throw new Errors.badRequestError(
    //     "same as current owner, nothing to change"
    //   );
    // }

    if (!query.project_name && query.owner_id) {
      const project_name = foundItem.project_name;
      const nameAlreadyExists = await projectDbServices.itemNameExists(
        project_name,
        query.owner_id
      );

      if (nameAlreadyExists) {
        throw new Errors.badRequestError(
          "this user already has a project with this name"
        );
      }
    }

    if (query.project_name && query.owner_id) {
      // if (
      //   query.project_name == foundItem.project_name &&
      //   query.owner_id == foundItem.owner_id
      // ) {
      //   throw new Errors.badRequestError("nothing to change");
      // }

      const nameAlreadyExists = await projectDbServices.itemNameExists(
        query.project_name,
        query.owner_id
      );

      if (
        nameAlreadyExists &&
        nameAlreadyExists.project_id != foundItem.project_id
      ) {
        throw new Errors.badRequestError(
          "this name is already used for another project owned by this user"
        );
      }
    }
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = projectServices;

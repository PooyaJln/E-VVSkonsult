const Errors = require("../utils/errors");
const validator = require("validator");
const Project = require("../models/projectModel");
const { poolPromise, pool, prisma } = require("../connections/dbConnection");
const db = require("../models");
const projectServices = {};

projectServices.projectNameExists = async (_name, id) => {
  try {
    const project = db.Project.findByName(_name, id);
    return project;
  } catch (error) {
    throw error;
  }
};

module.exports = projectServices;

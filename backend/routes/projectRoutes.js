const express = require("express");

const router = express.Router();

const projectControllers = require("../controllers/projectController");

//////////////////////////////////////////////////////
// create new project
router.post("/create-project", projectControllers.createItem);

// show all projects
router.get("/all$", projectControllers.getAllItems);

// get a single project
// router.get('/:project_id([0-9]{1,}$)/', getSingleProjectByIdSql)
router.get("/:project_id(\\d+$)", projectControllers.getItem);

// update a project
router.patch("/:project_id", projectControllers.updateItem);

// delete a project
router.delete("/:project_id", projectControllers.deleteItem);

module.exports = router;

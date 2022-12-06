const express = require('express');
const multer = require('multer')

const router = express.Router();
const upload = multer()

const { createProject,
    createProjectSql,
    getAllProjects,
    getAllProjectsSql,
    getSingleProject,
    getSingleProjectSql,
    projectUpdate,
    deleteProject,
    deleteProjectSql } = require('../controllers/projectController')



//////////////////////////////////////////////////////
// create new project
router.post('/create-project', createProjectSql)

// get a single envelope
router.get('/:project_id', getSingleProjectSql)

// show all projects
router.get('/', getAllProjectsSql)

// delete a single envelope
router.delete('/:project_id', deleteProjectSql)


module.exports = router
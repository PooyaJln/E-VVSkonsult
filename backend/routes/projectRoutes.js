const express = require('express');

const router = express.Router();

const {
    createProjectSql,
    getAllProjectsSql,
    projectUpdateSql,
    getSingleProjectByIdSql,
    deleteProjectSql
    // getAllProjects,
    // getSingleProject,
    // createProject,
    // projectUpdate,
    // deleteProject
} = require('../controllers/projectController')


//////////////////////////////////////////////////////
// create new project
router.post('/create-project', createProjectSql)

// get a single project
router.get('/:project_id', getSingleProjectByIdSql)

// show all projects
router.get('/', getAllProjectsSql)

// update a project
router.patch('/:project_id', projectUpdateSql)

// delete a project
router.delete('/:project_id', deleteProjectSql)


module.exports = router
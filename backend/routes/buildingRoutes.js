const express = require('express');

const router = express.Router();

const {
    getSingleBuildingByIdSql,
    // getSingleBuildingByNameSql,
    createBuildingSql,
    deleteBuildingSql,
    buildingUpdateSql
} = require('../controllers/buildingController')

// const { getProjectsBuildingsSql } = require('../controllers/projectController')


//////////////////////////////////////////////////////

// create new bulding
router.post('/create-building', createBuildingSql)


// get a single building
router.get('/:project_name/:building_id(\\d+$)', getSingleBuildingByIdSql)

// get a building by name 
// router.get('/:project_name/:building_name', getSingleBuildingByNameSql)

// get a single project's buildings
// router.get('/:project_name', getProjectsBuildingsSql)


// update a building
router.patch('/:project_name/:building_id(\\d+$)', buildingUpdateSql)


// delete a building
router.delete('/:project_name/:building_id(\\d+$)', deleteBuildingSql)


module.exports = router
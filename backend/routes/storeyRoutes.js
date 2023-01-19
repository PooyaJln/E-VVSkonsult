const express = require('express');

const router = express.Router();

const {
    createStoreySql,
    getSingleStoreyByIdSql,
    updateStoreyNameSql,
    deleteStoreyByIdSql
} = require('../controllers/storeyController')



//////////////////////////////////////////////////////

// create new storey
router.post('/create-storey', createStoreySql)


// get a single storey
router.get('/:storey_id(\\d+$)', getSingleStoreyByIdSql)


// get all stories in a building
// router.get('/:buildig_id',)


// update a storey
router.patch('/:storey_id', updateStoreyNameSql)


// delete a storey
router.delete('/:storey_id(\\d+$)', deleteStoreyByIdSql)


module.exports = router
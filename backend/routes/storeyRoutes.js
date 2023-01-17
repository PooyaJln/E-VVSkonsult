const express = require('express');

const router = express.Router();

const {
    createStoreySql,
    getSingleStoreyByIdSql
} = require('../controllers/storeyController')



//////////////////////////////////////////////////////

// create new storey
router.post('/create-storey', createStoreySql)


// get a single storey
router.get('/:storey_id', getSingleStoreyByIdSql)


// get all stories in a building
// router.get('/:buildig_id',)


// update a storey
// router.patch('/:storey_id',)


// delete a storey
// router.delete('/:storey_id',)


module.exports = router
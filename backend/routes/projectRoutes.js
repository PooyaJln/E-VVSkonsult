const express = require('express');
const multer = require('multer')

const router = express.Router();
const upload = multer()

const { createProject } = require('../controllers/projectController')


router.get('/', (req, res) => {
    res.json({ mssg: "projects' page" })
})

//////////////////////////////////////////////////////
// create new project
router.post('/create-project', upload.none(), createProject)

// get a single envelope
// router.get('/projects/:name', getSingleProject)


module.exports = router
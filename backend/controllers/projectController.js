
// import Schemas
const { projectSchema } = require('../models/projectModel');
const { wallSchema } = require('../models/wallModel');
const { apartmentSchema, roomSchema } = require('../models/roomModel')
const { envelopeSchema } = require('../models/envelopeTypeModel');
const { temperatureSchema } = require('../models/temperatureModel');

// import functions
const connToDatabase = require('../middlewares/dbConnection');

// get all Projects owned by a user
// const getAllProject = async (req, res) => {
//     const allProject = await Project.find({}).sort('Name asc')
//     res.status(200).json(allProject)
// }

// create a new project
const createProject = (req, res, next) => {
    const { projectName } = req.body
    const connection = connToDatabase(projectName)
    const wallModel = connection.model('wall', wallSchema)
    const roomModel = connection.model('room', roomSchema)
    const apartmentModel = connection.model('apartment', apartmentSchema)
    const envelopeModel = connection.model('envelope', envelopeSchema)
    const temperatureModel = connection.model('temperature', temperatureSchema)
    res.status(200).json({ mssg: `your project, ${projectName}, is created successfully` })
    return connection
}

//show a single project
// const getSingleProject = async (req, res) => {
//     // const name = req.param.name;
//     const { name } = req.params;
//     console.log(name)
//     // we need to validate type of the id
//     if (!mongoose.isValidObjectId(id)) {
//         // if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({ error: 'No such Project' })
//     }
//     const project = await Project.findById(id)
//     if (!project) {
//         return res.status(404).json({ error: 'No such project' })
//     }
//     res.status(200).json(project)
// }

//update a single project
// const projectUpdate = async (req, res) => {
//     const { id } = req.params;
//     if (!mongoose.isValidObjectId(id)) {
//         res.status(404).json({ error: "This project doesn't exist" })
//     }
//     const project = await Project.findByIdAndUpdate(id, req.body, { new: true }) // check for error
//     if (!project) {
//         return res.status(404).json({ error: 'No such project' })
//     }
//     res.status(200).json(project)
// }


//delete a single project
// const deleteProject = async (req, res) => {
//     const { id } = req.params;
//     if (!mongoose.isValidObjectId(id)) {
//         res.status(404).json({ error: "Project was not found" })
//     }
//     const project = await Project.findByIdAndDelete(id)
//     if (!project) {
//         return res.status(404).json({ error: 'No such project' })
//     }
//     res.status(200).json(project)

// }

module.exports = {
    createProject
    // getAllProject,
    // getSingleProject,
    // projectUpdate,
    // deleteProject
}

console.log(module)
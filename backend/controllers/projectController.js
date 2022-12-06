
const projects = require('../models/projectModel')
const { poolPromise } = require('../connections/dbConnection')

//----------------------------------------MySql

//------------------------ logic functions
const idCheckSql = async (id) => {
    const [foundId] = await poolPromise.query(`
                                        SELECT project_id 
                                        FROM projects 
                                        WHERE project_id = ?;
                                        `, [id])
    if (!foundId.length) {
        return false
    } else return true
}


const getAprojectSql = async (id) => {
    const [row] = await poolPromise.query(`
                                    SELECT *
                                    FROM projects
                                    WHERE project_id = ?
                                    `, [id]
    )
    return row[0]
}

const allProjectsSql = async () => {
    const [rows] = await poolPromise.query(`SELECT * FROM projects`)
    return rows
}


//---------------------------------- MySQL CRUD functions---------------------------
const getSingleProjectSql = async (req, res) => {
    const id = req.params.project_id;
    try {
        if (await idCheckSql(id)) {
            const project = await getAprojectSql(id)
            return res.status(200).json(project)
        } else {
            return res.status(404).json({ error: "Project was not found" })
        }
    } catch (error) {
        console.log(error)
    }
}

// get all Projects
const getAllProjectsSql = async (req, res) => {
    const projects = await allProjectsSql()
    res.status(200).json(projects)
}

// create a new project
const createProjectSql = async (req, res) => {
    const { project_name } = req.body;
    try {
        const [newProjectSql] = await poolPromise.query(`
                                                INSERT INTO projects 
                                                (project_name) 
                                                VALUES (?)
                                                `, [project_name]
        )

        const id = newProjectSql.insertId
        const result = await getAprojectSql(id)
        res.status(201).json(result)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

//delete a single project
const deleteProjectSql = async (req, res) => {
    const id = req.params.project_id;
    try {
        if (await idCheckSql(id)) {
            await poolPromise.query(`
                                DELETE FROM projects 
                                WHERE project_id = ?
                            `, [id]
            )
                .then(async () => {
                    res.status(200).json(await allProjectsSql())
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            res.status(404).json({ error: "Project was not found" })
        }
    } catch (error) {
        console.log(error)
    }
}

//---------------------------------------------------------MongoDB
const getSingleProject = async (req, res) => {
    const { name } = req.params;
    console.log(name)
    // we need to validate type of the id
    if (!mongoose.isValidObjectId(id)) {
        // if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Project' })
    }
    const project = await Project.findById(id)
    if (!project) {
        return res.status(404).json({ error: 'No such project' })
    }
    res.status(200).json(project)
}

// get all Projects
const getAllProjects = async (req, res) => {
    const allProject = await Project.find({}).sort('Name asc')
    res.status(200).json(allProject)
}

// create a new project
const createProject = async (req, res) => {
    const { project_name } = req.body;
    try {
        const newProjectMng = await projects.create({ project_name })
        res.status(201).json(newProjectMng)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

//update a single project
const projectUpdate = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        res.status(404).json({ error: "This project doesn't exist" })
    }
    const project = await Project.findByIdAndUpdate(id, req.body, { new: true }) // check for error
    if (!project) {
        return res.status(404).json({ error: 'No such project' })
    }
    res.status(200).json(project)
}


//delete a single project
const deleteProject = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        res.status(404).json({ error: "Project was not found" })
    }
    const project = await Project.findByIdAndDelete(id)
    if (!project) {
        return res.status(404).json({ error: 'No such project' })
    }
    res.status(200).json(project)
}

module.exports = {
    createProject,
    createProjectSql,
    getAllProjects,
    getAllProjectsSql,
    getSingleProject,
    getSingleProjectSql,
    projectUpdate,
    deleteProject,
    deleteProjectSql
}


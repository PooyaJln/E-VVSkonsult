
// const projects = require('../models/projectModel')
const { poolPromise, pool } = require('../connections/dbConnection')
const { projectIdCheckSql, findProjectIdByNameSql } = require('./projectController')
//----------------------------------------MySql

//------------------------ logic functions
const buildingIdCheckSql = async (id) => {
    const sqlQuery = `SELECT building_id 
                        FROM buildings 
                        WHERE building_id = ?;`
    const sqlArgum = [id]
    try {
        const [foundId] = await poolPromise.query(sqlQuery, sqlArgum)
        console.log(foundId[0])
        if (!foundId.length) {
            return false
        } else {
            return true
        }
    } catch (error) {
        console.error()
    }

}

const findBuildingIdByNameSql = async (p_name, b_name) => {
    const sqlQuery = `
        SELECT building_id
        FROM buildings 
        JOIN projects USING(project_id)  
        WHERE (project_name) = ? AND (building_name) = ?;`
    const sqlArgum = [p_name, b_name]
    try {
        const [foundfindBuildingIdByName] = await poolPromise.query(sqlQuery, sqlArgum)
        // console.log(foundId[0].building_id)
        // if (!foundId.length) {
        //     return false
        // } else {
        //     return true
        // }
        console.log("foundfindBuildingIdByName[0]: ", foundfindBuildingIdByName[0])
        return foundfindBuildingIdByName[0]
    } catch (error) {
        console.error()
    }

}

const findBuildingByNameSql = async (name) => {
    try {
        const [row] = await poolPromise.query(`
                                    SELECT *
                                    FROM buildings
                                    WHERE building_name = ?
                                    `, [name])
        console.log('findBildingByNameSql: ', row[0])
        return row[0]
    } catch (error) {
        console.error()
    }

}

const findBuildingByIdSql = async (id) => {
    try {
        const [row] = await poolPromise.query(`
                                    SELECT *
                                    FROM buildings
                                    WHERE building_id = ?
                                    `, [id])
        console.log("findBuildingByIdSql: ", row[0])
        return row[0]
    } catch (error) {
        console.error()
    }

}

const fetchAllBuildingsInProject = async (project_name) => {
    const sqlQuery = `SELECT building_name
                            FROM buildings 
                            JOIN projects USING(project_id)  
                            WHERE project_name = ? ;`
    const sqlArgum = [project_name]
    try {
        const [buildings] = await poolPromise.query(sqlQuery, sqlArgum)
        console.log("fetchAllBuildingsInProject: ", buildings)
        return buildings
    } catch (error) {
        console.error()
    }

}


//---------------------------------- MySQL CRUD functions---------------------------
// create a new building
const createBuildingSql = async (req, res) => {
    const project_name = req.params.project_name
    const { building_name } = req.body;
    const project = await findProjectIdByNameSql(project_name)
    if (!project) {
        return res.status(400).json({ error: `Project name '${project_name}' in the URL was not found in the database` })
    }
    try {
        const project_id = project.project_id
        console.log(project_id)
        const [row] = await poolPromise.query(`
                                                    SELECT building_id,building_name
                                                    FROM buildings
                                                    WHERE building_name = ?
                                                    AND project_id = ?
                                                    `, [building_name, project_id])
        console.log(row[0])
        if (!row.length) {
            const [newBuildingSql] = await poolPromise.query(`
                                                INSERT INTO buildings
                                                (building_name, project_id) 
                                                VALUES(?,?)
                                                `, [building_name, project_id])

            const id = newBuildingSql.insertId
            const result = await findBuildingByIdSql(id)
            res.status(201).json(result)
        } else throw Error(`Building '${building_name}' already exists in the database. Enter a new name.`)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "couldn't create this building" })
    }
}

// show a single buildings info by id.
const getSingleBuildingByIdSql = async (req, res, next) => {
    const project_name = req.params.project_name;
    const building_id = req.params.building_id;
    try {
        const foundBuilding = await findBuildingByIdSql(building_id)
        if (foundBuilding) {
            const sqlQuery = `SELECT building_id, building_name, project_name
                            FROM buildings 
                            JOIN projects USING(project_id)  
                            WHERE project_name = ? and building_id = ?;`
            const sqlArgum = [project_name, building_id]
            const [sqlResponse] = await poolPromise.query(sqlQuery, sqlArgum)
            const message = `this function will be completted with a list of storeys in a building ${building_id}`
            const building = sqlResponse[0]
            building.message = message
            return res.status(200).json(building)
        } else {
            res.status(404).json({ error: "this Building was not found1" })

        }
    } catch (error) {
        console.log(error)
        res.status(404).json({ error: "this Building was not found2" })
    }
    next()
}

// show a single buildings info by name.
const getSingleBuildingByNameSql = async (req, res) => {
    const project_name = req.params.project_name;
    const building_name = req.params.building_name;

    // console.log('getSingleBuildingByNameSql', project_id)
    try {
        const project = await findProjectIdByNameSql(project_name)
        const project_id = project.project_id
        const sqlQuery = `SELECT building_id, building_name, project_name
                        FROM buildings 
                        JOIN projects USING(project_id)  
                        WHERE project_id = ? and building_name = ?;`
        const sqlArgum = [project_id, building_name]
        const [sqlResponse] = await poolPromise.query(sqlQuery, sqlArgum)
        if (sqlResponse) {
            const message = `this function will be completted with a list of storeys in the building ${building_name}`
            const building = sqlResponse[0]
            building.message = message
            console.log(building)
            return res.status(200).json(building)
        } else {
            return res.status(404).json({ error: "this Building was not found3" })
        }
    } catch (error) {
        console.log(error)
        return res.status(404).json({ error: "this Building was not found4" })
    }
}

//update a single project
const buildingUpdateSql = async (req, res) => {
    const project_name = req.params.project_name;
    const building_id = req.params.building_id;
    const { newBuilding_name } = req.body
    const foundBuilding = await findBuildingByIdSql(building_id)
    try {
        if (foundBuilding) {
            await poolPromise.query(`
                                UPDATE buildings 
                                SET building_name = ?
                                WHERE building_id = ?
                                `, [newBuilding_name, building_id])
                .then(async () => {
                    const Updated = await findBuildingByIdSql(building_id)
                    res.status(200).json(Updated)
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            res.status(404).json({ error: "this building was not found" })
        }
    } catch (error) {
        console.log(error)
    }
}

//delete a single project
const deleteBuildingSql = async (req, res) => {
    const building_id = req.params.building_id;
    const project_name = req.params.project_name;
    const project = await findProjectIdByNameSql(project_name)
    if (!project) {
        return res.status(400).json({ error: 'wrong project' })
    }
    const foundBuilding = await poolPromise.query(`
                                                    SELECT building_id, building_name
                                                    from buildings
                                                    WHERE building_id = ?
                                                    `, [building_id])
    if (!foundBuilding[0].length) {
        return res.status(400).json({ error: 'this building was not found' })
    }
    try {
        if (foundBuilding) {
            await poolPromise.query(`
                                DELETE FROM buildings 
                                WHERE building_id = ?
                                `, [building_id])
                .then(async () => {
                    const buildings = await fetchAllBuildingsInProject(project_name)
                    const buildingsArray = buildings.map(item => item.building_name).sort()
                    res.status(200).json({ project_name: project_name, buildings: buildingsArray })
                })
                .catch(err => {
                    console.log(err)
                    res.status(404).json({ error: "couldn't delete the building, does it have any storeys?" })
                })
        } else {
            res.status(404).json({ error: "This building was not found" })
        }
    } catch (error) {
        console.log(error)
        res.status(404).json({ error: "couldn't delete the building, does it have any storeys?" })
    }
}


//---------------------------------------------------------MongoDB
// const getSingleProject = async (req, res) => {
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

// // get all Projects
// const getAllProjects = async (req, res) => {
//     const allProject = await Project.find({}).sort('Name asc')
//     res.status(200).json(allProject)
// }

// // create a new project
// const createProject = async (req, res) => {
//     const { project_name } = req.body;
//     try {
//         const newProjectMng = await projects.create({ project_name })
//         res.status(201).json(newProjectMng)
//     } catch (error) {
//         res.status(404).json({ error: error.message })
//     }
// }

// //update a single project
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


// //delete a single project
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

    findBuildingIdByNameSql,
    findBuildingByNameSql,
    findBuildingByIdSql,
    getSingleBuildingByIdSql,
    getSingleBuildingByNameSql,
    createBuildingSql,
    deleteBuildingSql,
    buildingUpdateSql
}
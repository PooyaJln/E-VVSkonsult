
// const projects = require('../models/projectModel')
const { poolPromise, pool } = require('../connections/dbConnection')
const { findProjectIdByNameSql } = require('./projectController')
const { findBuildingByIdSql, findBuildingIdByNameSql, findBuildingByNameSql } = require('./buildingController')

//----------------------------------------MySql
//------------------------ logic functions
const storeyIdCheckSql = async (id) => {
    const sqlQuery = `SELECT storey_id 
                        FROM stories 
                        WHERE storey_id = ?;`
    const sqlArgum = [id]
    const [foundId] = await poolPromise.query(sqlQuery, sqlArgum)
    console.log(foundId[0])
    if (!foundId.length) {
        return false
    } else {
        return true
    }
}

const findStoreyIdByNameSql = async (b_name, s_name) => {
    const sqlQuery = `SELECT storey_id
                    FROM stories 
                    JOIN building USING(building_id)  
                    WHERE (building_name) = ? AND (storey_name) = ?;`
    const sqlArgum = [b_name, s_name]
    try {
        const [foundStoreyIdByName] = await poolPromise.query(sqlQuery, sqlArgum)
        console.log("findStoreyIdByNameSql: ", foundStoreyIdByName[0])
        return foundStoreyIdByName[0]
    } catch (error) {
        console.error(error)
    }

}

const findStoreyByNameSql = async (b_name, s_name) => {
    try {
        const sqlQuery = `
                    SELECT *
                    FROM stories 
                    JOIN building USING(building_id)  
                    WHERE (building_name) = ? AND (storey_name) = ?;`
        const sqlArgum = [b_name, s_name]
        const [foundStorey] = await poolPromise.query(sqlQuery, sqlArgum)
        console.log('findStoreyByNameSql: ', foundStorey[0])
        return foundStorey[0]
    } catch (error) {
        console.error(error)
    }

}

const findStoreyByIdSql = async (id) => {
    try {
        const sqlQuery = `
                        SELECT *
                        FROM stories
                        WHERE storey_id = ?`
        const sqlArgum = [id]
        const [foundStorey] = await poolPromise.query(sqlQuery, sqlArgum)
        console.log("findStoreyByIdSql: ", foundStorey[0])
        return foundStorey[0]
    } catch (error) {
        console.error(error)
    }
}

const findStoreyByIdBuildingName = async (id, b_name) => {
    const sqlQuery = `SELECT storey_id, storey_name, building_id, building_name
                      FROM stories
                      JOIN buildings USING(building_id)
                      WHERE storey_id = ? And  building_name = ?`
    const sqlArgum = [id, b_name]
    try {
        const [foundStorey] = await poolPromise.query(sqlQuery, sqlArgum)
        console.log("findStoreyByIdBuildingName: ", foundStorey[0])
        return foundStorey[0]
    } catch (error) {
        console.error(error)
    }
}
const findAllStoriesInBuildingByBuildingName = async (b_name) => {
    try {
        const sqlQuery = `SELECT storey_id, storey_name
                            FROM stories 
                            JOIN buildings USING(building_id)  
                            WHERE building_name = ? ;`
        const sqlArgum = [b_name]
        const [stories] = await poolPromise.query(sqlQuery, sqlArgum)
        const storiesArray = stories.map(item => item.storey_name).sort()
        console.log("findAllStoriesInBuildingByBuildingName: ", storiesArray)
        return storiesArray
    } catch (error) {
        console.error(error)
    }

}

const checkProjectAndBuilding = async (p_name, b_name) => {
    const project_name = p_name
    const building_name = b_name

    try {
        let results = { project_id: "", building_id: "" }
        const project = await findProjectIdByNameSql(project_name)
        if (!project) {
            results = {}
            throw Error(`Project name '${project_name}' was not found in the database`)
        }
        const building = await findBuildingIdByNameSql(project_name, building_name)
        if (!building) {
            results = {}
            throw Error(`building name '${building_name}' was not found in the database`)
        }
        if (project && building) {
            results = { project_id: project.project_id, building_id: building.building_id }
        }
        console.log("checkProjectAndBuilding: ", resulst)
        return results
    } catch (error) {
        console.error(error)
    }
}

//---------------------------------- MySQL CRUD functions---------------------------
// create a new building
const createStoreySql = async (req, res) => {
    const { project_name, building_name, storey_name } = req.body;
    try {
        const project = await findProjectIdByNameSql(project_name)
        if (!project) {
            return res.status(400).json({ error: `Project name '${project_name}' was not found in the database` })
        }
        const building = await findBuildingIdByNameSql(project_name, building_name)
        if (!building) {
            return res.status(400).json({ error: `building name '${building_name}' was not found in the database` })
        }

        const building_id = building.building_id
        const sqlQuery = `SELECT storey_id,storey_name
                        FROM stories
                        WHERE storey_name = ?
                        AND building_id = ?`
        const sqlArgum = [storey_name, building_id]
        const [foundStorey] = await poolPromise.query(sqlQuery, sqlArgum)
        // console.log(foundStorey[0])
        if (!foundStorey[0]) {
            const [newStorey] = await poolPromise.query(`
                                                INSERT INTO stories
                                                (storey_name, building_id) 
                                                VALUES(?,?)
                                                `, [storey_name, building_id])

            const id = newStorey.insertId
            const result = await findStoreyByIdSql(id)
            return res.status(201).json(result)
        } else {
            return res.status(400).json({ error: `storey '${storey_name}' already exists in the database. Enter a new name.` })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Couldn't create this storey" })
    }
}

// show a single storey info by id.
const getSingleStoreyByIdSql = async (req, res) => {
    const { project_name, building_name } = req.body
    // const project_name = req.params.project_name
    // const building_name = req.params.building_name
    const storey_id = req.params.storey_id
    try {
        const project = await findProjectIdByNameSql(project_name)
        if (!project) {
            return res.status(400).json({ error: `Project name '${project_name}' was not found in the database` })
        }
        const building = await findBuildingIdByNameSql(project_name, building_name)
        if (!building) {
            return res.status(400).json({ error: `building name '${building_name}' was not found in the database` })
        }
        const sqlQuery = `SELECT project_name, building_name,storey_id , storey_name  
                        FROM stories 
                        JOIN buildings USING(building_id)
                        JOIN projects USING (project_id)  
                        WHERE storey_id = ?;`
        const sqlArgum = [storey_id]
        const [foundStorey] = await poolPromise.query(sqlQuery, sqlArgum)
        if (!foundStorey.length) {
            return res.status(400).json({ error: `this storey is either not created or doesn't belong to this building` })
        }
        if (foundStorey) {
            const storey_name = foundStorey[0].storey_name
            const apartments = `this function will be completted with a list of apartments in storey ${storey_name}`
            foundStorey[0].apartments = apartments
            // const storey = foundStorey[0]
            // storey.message = message
            return res.status(200).json(foundStorey[0])
        }
    } catch (error) {
        res.status(400).json(error.message)
    }

}

// show a single storey info by name.
// const getSingleBuildingByNameSql = async (req, res) => {
//     const project_name = req.params.project_name;
//     const building_name = req.params.building_name;
//     const project = await findProjectIdByNameSql(project_name)
//     const project_id = project.project_id
//     console.log('getSingleBuildingByNameSql', project_id)
//     try {
//         const sqlQuery = `SELECT building_id, building_name, project_name
//                         FROM buildings 
//                         JOIN projects USING(project_id)  
//                         WHERE project_id = ? and building_name = ?;`
//         const sqlArgum = [project_id, building_name]
//         const [sqlResponse] = await poolPromise.query(sqlQuery, sqlArgum)
//         if (sqlResponse) {
//             const message = `this function will be completted with a list of apartments in the storey ${storey_name}`
//             const building = sqlResponse[0]
//             building.message = message
//             console.log(building)
//             return res.status(200).json(building)
//         } else {
//             return res.status(404).json({ error: "this Building was not found3" })
//         }
//     } catch (error) {
//         console.log(error)
//         return res.status(404).json({ error: "this Building was not found4" })
//     }
// }

//update a single project
const updateStoreyNameSql = async (req, res) => {
    const storey_id = Number(req.params.storey_id);
    const { building_name, newStorey_name } = req.body;
    try {
        const existingStorey = await findStoreyByIdSql(storey_id)
        console.log("existingStorey: ", existingStorey)
        if (!existingStorey) {
            return res.status(400).json({ error: `Storey '${storey_id}' was not found` })
        }
        if (!building_name && newStorey_name !== existingStorey.storey_name) {
            let sqlQuery = `UPDATE stories
                            SET storey_name = ?  
                            WHERE storey_id = ?;`
            let sqlArgum = [newStorey_name, storey_id]
            await poolPromise.query(sqlQuery, sqlArgum)
                .then(async () => {
                    let sqlQuery = `SELECT storey_id, storey_name, building_id, building_name 
                                        FROM stories
                                        JOIN buildings 
                                        USING(building_id)  
                                        WHERE storey_id = ?;`
                    let sqlArgum = [storey_id]
                    const [updatedStorey] = await poolPromise.query(sqlQuery, sqlArgum)
                    return res.status(200).json(updatedStorey[0])
                })
                .catch((error) => {
                    console.error(error)
                    return res.status(400).json({ error: "error in updating storey name" })
                }
                )
        }
        if (!building_name && newStorey_name == existingStorey.storey_name) {
            return res.status(400).json({ error: "You entered the same storey data as the existing one" })
        }
        if (building_name) {
            const building = await findBuildingByNameSql(building_name)
            if (building.building_id !== existingStorey.building_id) {
                let sqlQuery = `UPDATE stories
                            SET storey_name = ?,  building_id = ?
                            WHERE storey_id = ?;`
                let sqlArgum = [newStorey_name, building.building_id, storey_id]
                await poolPromise.query(sqlQuery, sqlArgum)
                    .then(async () => {
                        let sqlQuery = `SELECT storey_id, storey_name, building_id, building_name 
                                        FROM stories
                                        JOIN buildings 
                                        USING(building_id)  
                                        WHERE storey_id = ?;`
                        let sqlArgum = [storey_id]
                        const [updatedStorey] = await poolPromise.query(sqlQuery, sqlArgum)
                        return res.status(200).json(updatedStorey[0])
                    })
                    .catch(error => {
                        console.error(error)
                        return res.status(400).json({ error: "error in updating building and storey name" })
                    })
            }
        }
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: "error in updating storey" })
    }
}

//delete a single storey
const deleteStoreyByIdSql = async (req, res) => {
    const storey_id = req.params.storey_id;
    const { building_name } = req.body
    try {
        const existingStorey = await findStoreyByIdBuildingName(storey_id, building_name)
        // console.log("existingStorey: ", existingStorey)
        if (!existingStorey) {
            throw Error(`Storey was not found`)
        }
        const building_id = existingStorey.building_id
        // let sqlQuery = `SELECT storey_id , storey_name, building_name  
        //                 FROM stories 
        //                 JOIN buildings USING(building_id)
        //                 WHERE building_id = ?;`
        // let sqlArgum = [building_id]
        // let [existingFoundStories] = await poolPromise.query(sqlQuery, sqlArgum)
        // console.log("existingFoundStories: ", existingFoundStories)
        // let existingFoundStoriesArray = existingFoundStories.map(item => item.storey_name)
        // console.log("existingFoundStoriesArray: ", existingFoundStoriesArray)
        await poolPromise.query(`
                                DELETE FROM stories 
                                WHERE storey_id = ?
                                `, [storey_id])
            .then(async () => {
                let sqlQuery = `SELECT storey_id , storey_name, building_name  
                        FROM stories 
                        JOIN buildings USING(building_id)
                        WHERE building_id = ?;`
                let sqlArgum = [building_id]
                let [foundStories] = await poolPromise.query(sqlQuery, sqlArgum)
                let foundStoriesArray = foundStories.map(item => item.storey_name)
                console.log("foundStoriesArray: ", foundStoriesArray)
                return res.status(200).json({ building_name, stories: foundStoriesArray })
                // return res.status(200).json({ existingFoundStoriesArray, foundStoriesArray })
            })
            .catch(err => {
                console.log(err)
                throw Error("couldn't delete the storey, does it have any apartment in it?")
            })
    } catch (error) {
        console.log(error)
        return res.status(404).json({ error: error.message })
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
    createStoreySql,
    getSingleStoreyByIdSql,
    updateStoreyNameSql,
    deleteStoreyByIdSql
}
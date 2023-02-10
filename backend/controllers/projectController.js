const projects = require("../models/projectModel");
const Errors = require("../utils/errors");
const { poolPromise } = require("../connections/dbConnection");
const Project = require("../models/projectModel");
const projectServices = require("../services/projectServices");
const db = require("../models");
//----------------------------------------
const projectControllers = {};

// create new projects
projectControllers.createItem = async (req, res, next) => {
  try {
    const { project_name, owner_id } = req.body;
    if (!project_name || !owner_id) {
      throw new Errors.badRequestError("incomplete input data");
    }
    const newProject = await db.Project.create(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
};

// get all projects
projectControllers.getAllItems = async (req, res, next) => {
  try {
    const { owner_id } = req.body;

    const allProjects = await db.project.findAll({
      attributes: ["project_name", "owner_id"],
      where: { owner_id },
    });
    res.status(200).json(allProjects);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// update an project
projectControllers.updateItem = async (req, res, next) => {
  try {
    const id = req.params.id;
    // console.log("req.body: ", req.body);
    let updatedProject = await Project.update(id, req.body);
    return res.status(200).json(updatedProject);
  } catch (error) {
    next(error);
  }
};

//get a single project
projectControllers.getSingleItem = async (req, res, next) => {
  try {
    const id = req.params.id;
    let project = await Project.findById(id)
      .then(async () => {
        return await Project.publicInfoById(id);
      })
      .catch((error) => {
        throw error;
      });
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

//delete a single project
projectControllers.deleteItem = async (req, res, next) => {
  try {
    const id = req.params.id;
    let message = await Project.delete(id);
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};
//----------------------------------------MySql

//------------------------ logic functions
const projectIdCheckSql = async (id) => {
  try {
    const [foundId] = await poolPromise.query(
      `
                                        SELECT project_id 
                                        FROM projects 
                                        WHERE project_id = ?;
                                        `,
      [id]
    );
    console.log(foundId[0]);
    if (!foundId.length) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error(error);
  }
};

const findProjectByIdSql = async (id) => {
  try {
    const [row] = await poolPromise.query(
      `
                                            SELECT *
                                            FROM projects
                                            WHERE project_id = ?`,
      [id]
    );

    console.log("findProjectByIdSql:", row[0]);
    return row[0];
  } catch (error) {
    console.error(error);
  }
};
const findProjectIdByNameSql = async (name) => {
  try {
    const [row] = await poolPromise.query(
      `
                                    SELECT project_id
                                    FROM projects
                                    WHERE project_name = ?
                                    `,
      [name]
    );
    console.log("findProjectIdByNameSql: ", row[0]);
    return row[0];
  } catch (error) {
    console.error(error);
  }
};

const allProjectsSql = async () => {
  try {
    const [rows] = await poolPromise.query(`SELECT * FROM projects`);
    return rows;
  } catch (error) {
    console.error(error);
  }
};

const fetchAllBuildingsInProjectById = async (id) => {
  const sqlQuery = `SELECT building_name
                            FROM buildings 
                            JOIN projects USING(project_id)  
                            WHERE project_id = ? ;`;
  const sqlArgum = [id];
  try {
    const [foundBuildings] = await poolPromise.query(sqlQuery, sqlArgum);
    const buildings = foundBuildings.map((item) => item.building_name);
    console.log("fetchAllBuildingsInProjectById: ", buildings);
    return buildings;
  } catch (error) {
    console.error();
  }
};

//---------------------------------- MySQL CRUD functions---------------------------
// create a new project
const createProjectSql = async (req, res) => {
  const { project_name } = req.body;
  try {
    const [row] = await poolPromise.query(
      `
                                        SELECT project_id
                                        FROM projects
                                        WHERE project_name = ?
                                        `,
      [project_name]
    );
    console.log(row);
    if (!row.length) {
      try {
        const [newProjectSql] = await poolPromise.query(
          `
                                                        INSERT INTO projects 
                                                        (project_name) 
                                                        VALUES (?)
                                                        `,
          [project_name]
        );

        const id = newProjectSql.insertId;
        const result = await findProjectByIdSql(id);
        res.status(201).json(result);
      } catch (error) {
        console.log(error);
      }
    } else
      throw Error(
        `the project name '${project_name}' already exists in the database. Enter a new name.`
      );
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};
// get a single project info and all its buildings
const getSingleProjectByIdSql = async (req, res) => {
  const id = req.params.project_id;
  try {
    if (await projectIdCheckSql(id)) {
      const project = await findProjectByIdSql(id);
      const buildings = await fetchAllBuildingsInProjectById(id);
      project.buildings = buildings;
      return res.status(200).json(project);
    } else {
      return res.status(404).json({ error: "Project was not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

// get all Projects
const getAllProjectsSql = async (req, res) => {
  const projects = await allProjectsSql();
  res.status(200).json(projects);
};

// get all buildings in a project
// const getProjectsBuildingsSql = async (req, res) => {
//     const project_name = req.params.project_name
//     console.log(project_name)
//     const project = await findProjectIdByNameSql(project_name)
//     if (!project) {
//         return res.status(400).json({ error: `Project name ${project_name} in the URL was not found in the database` })
//     }
//     try {
//         let projectBuildingObj = {}
//         const project_id = project.project_id
//         const [allBuildings] = await poolPromise.query(`
//                                             SELECT building_name
//                                             FROM buildings
//                                             WHERE project_id = ?
//                                             `, [project_id])
//         const allBuildingsArray = allBuildings.map(item => item.building_name)
//         if (allBuildings.length) {
//             projectBuildingObj.project_name = project_name
//             projectBuildingObj.buildings = allBuildingsArray
//             res.status(200).json(projectBuildingObj)
//         } else return res.status(200).json({ message: 'no building in this project yet' })
//     } catch (error) {
//         console.log(error.message)
//         res.status(404).json({ error: error.message })
//     }
// }

//delete a single project
const deleteProjectSql = async (req, res) => {
  const id = req.params.project_id;
  try {
    if (await projectIdCheckSql(id)) {
      await poolPromise
        .query(
          `
                                DELETE FROM projects 
                                WHERE project_id = ?
                                `,
          [id]
        )
        .then(async () => {
          res.status(200).json(await allProjectsSql());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.status(404).json({ error: "Project was not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

//update a single project
const projectUpdateSql = async (req, res) => {
  const id = req.params.project_id;
  const { newProject_name } = req.body;
  try {
    if (await projectIdCheckSql(id)) {
      await poolPromise
        .query(
          `
                                UPDATE projects 
                                SET project_name = ?
                                WHERE project_id = ?
                                `,
          [newProject_name, id]
        )
        .then(async () => {
          const Updated = await findProjectByIdSql(id);
          res.status(200).json(Updated);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.status(404).json({ error: "Project was not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = projectControllers;

//---------------------------------------------------------MongoDB
// const getSingleProject = async (req, res) => {
//     const { project_name } = req.params;
//     console.log(project_name)
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

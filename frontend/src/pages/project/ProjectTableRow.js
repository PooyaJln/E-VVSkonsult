import React, { useState } from "react";
import { useProjectsContext } from "../../hooks/useProjectsContext";

import { Link } from "react-router-dom";

const ProjectTableRow = ({ project }) => {
  let { state, uiCalls, apiCalls } = useProjectsContext();
  let projects = state?.projects || [];
  let error = state?.error || undefined;
  const [projectName, setProjectName] = useState(project.project_name);
  const [updateToggle, setUpdateToggle] = useState(false);

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this project? All buildings and apartments will be deleted as well"
      )
    ) {
      apiCalls.deleteProject(id);
    }
  };

  const handleUpdateIconClick = async (item) => {
    setUpdateToggle(true);
    setProjectName(item.project_name);
    console.log("ready to Edit item", item.project_name);
  };

  const handleUpdateSave = async (e, item) => {
    e.preventDefault();
    const itemToUpdate = {
      ...item,
      project_name: projectName,
    };

    apiCalls.updateProject(item.project_id, itemToUpdate);
    setUpdateToggle(!updateToggle);
    // let projectsNamesList = [];
    // state.projects.map((project) =>
    //   projectsNamesList.push(project.project_name)
    // );
    // if (projectsNamesList.includes(projectName)) {
    //   uiCalls.setError("This name already exists!!!");
    //   uiCalls.setOpen(true);
    //   setUpdateToggle(!updateToggle);
    //   return;
    // }
    // setProjectName(item.project_name);
  };

  return (
    <tr className="items-table-data-row">
      <td className="items-table-cell-name">
        {!updateToggle ? (
          <Link
            to={`${project.project_id}`}
            className="items-table-cell-name-a"
            project={project}
          >
            {project.project_name}
          </Link>
        ) : (
          <form
            className="update-form-in-table-row"
            onSubmit={(e) => handleUpdateSave(e, project)}
          >
            <input
              type="text"
              className="items-table-cell-name-input"
              placeholder={project.project_name}
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              autoFocus
              // onFocus={() => uiCalls.setErrorUndef()}
            />
          </form>
        )}
      </td>
      <td className="items-table-cell ">
        {!updateToggle ? (
          <button onClick={() => handleUpdateIconClick(project)}>
            <span className="material-symbols-outlined">edit_note</span>
          </button>
        ) : (
          <>
            <button onClick={(e) => handleUpdateSave(e, project)}>
              <span className="material-symbols-outlined">save</span>
            </button>
            <button onClick={() => setUpdateToggle(!updateToggle)}>
              <span className="material-symbols-outlined">cancel</span>
            </button>
          </>
        )}
      </td>
      <td className="items-table-cell">
        <button onClick={() => handleDelete(project.project_id)}>
          <span className="material-symbols-outlined">delete</span>
        </button>
      </td>
    </tr>
  );
};

export default ProjectTableRow;

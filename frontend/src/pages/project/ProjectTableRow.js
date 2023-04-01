import React, { useState } from "react";
import { useProjectsContext } from "../../hooks/useProjectsContext";

import { Link } from "react-router-dom";

const ProjectTableRow = ({ project }) => {
  let { apiCalls } = useProjectsContext();
  const [updateToggle, setUpdateToggle] = useState(false);
  const [projectName, setProjectName] = useState(project.project_name);

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this project? All buildings and apartments will be deleted as well"
      )
    ) {
      apiCalls.deleteProject(id);
    }
  };

  const handleUpdateIconClick = async (id) => {
    setUpdateToggle(true);
    console.log("ready to Edit item", id);
  };

  const handleUpdateSave = async (e, item) => {
    e.preventDefault();
    const itemToUpdate = {
      ...item,
      project_name: projectName,
    };
    console.log(
      "🚀 ~ file: ProjectTableRow.js:29 ~ handleUpdateSave ~ itemToUpdate:",
      itemToUpdate
    );

    apiCalls.updateProject(item.project_id, itemToUpdate);
    setUpdateToggle(!updateToggle);
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
              onFocus={() => {}}
            />
          </form>
        )}
      </td>
      <td className="items-table-cell ">
        {!updateToggle ? (
          <button onClick={() => handleUpdateIconClick(project.project_id)}>
            <span className="material-symbols-outlined">edit_note</span>
          </button>
        ) : (
          <>
            <button onClick={(e) => handleUpdateSave(e, project)}>
              <span className="material-symbols-outlined">save</span>
            </button>
            <button onClick={() => setUpdateToggle(false)}>
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

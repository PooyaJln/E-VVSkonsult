import React, { useState } from "react";
import { useProjectsContext } from "../../hooks/useProjectsContext";
import { Link } from "react-router-dom";

const ProjectTableRow = ({ project, setParentError }) => {
  let { dispatch } = useProjectsContext();
  const [isDisabled, setIsDisabled] = useState(true);
  const [projectName, setProjectName] = useState(project.project_name);

  const [toggle, setToggle] = useState(true);

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this project? All buildings and apartments will be deleted as well"
      )
    ) {
      const projectDeleteURI = "http://localhost:4001/heat-loss/projects/";
      const response = await fetch(projectDeleteURI + id, {
        method: "DELETE",
      });
      const responseToJson = await response.json();

      if (response.ok) {
        dispatch({ type: "DELETE_PROJECT", payload: responseToJson });
      }
    }
  };
  const handleUpdate = async (id) => {
    setToggle(!toggle);
    setIsDisabled(false);
    console.log("ready to Edit item", id);
  };

  const handleUpdateSave = async (e, item) => {
    e.preventDefault();
    const itemToUpdate = {
      ...item,
      project_name: projectName,
    };

    const projectUpdateURI = "http://localhost:4001/heat-loss/projects/";

    const response = await fetch(projectUpdateURI + item.project_id, {
      method: "PATCH",
      body: JSON.stringify(itemToUpdate),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseToJson = await response.json();

    if (!response.ok) {
      console.log(responseToJson.error);
      setParentError(responseToJson.error);
    }

    if (response.ok) {
      setParentError(null);
      setToggle(!toggle);
      dispatch({ type: "UPDATE_PROJECT", payload: responseToJson });
      // console.log("project updated");
    }
  };

  return (
    <tr className="items-table-data-row">
      <td className="items-table-cell-name">
        {toggle ? (
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
              disabled={isDisabled}
              onChange={(e) => setProjectName(e.target.value)}
              onFocus={() => setParentError(null)}
            />
          </form>
        )}
      </td>
      <td className="items-table-cell ">
        {toggle ? (
          <button onClick={() => handleUpdate(project.project_id)}>
            <span className="material-symbols-outlined">edit_note</span>
          </button>
        ) : (
          <>
            <button onClick={(e) => handleUpdateSave(e, project)}>
              <span className="material-symbols-outlined">save</span>
            </button>
            <button onClick={() => setToggle(!toggle)}>
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

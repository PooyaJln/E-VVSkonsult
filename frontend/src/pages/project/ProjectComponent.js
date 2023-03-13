import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";

const ProjectComponent = ({ key, item, projectList }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [projectName, setProjectName] = useState("");

  const handleDelete = async (id) => {
    const projectDeleteURI = "http://localhost:4001/heat-loss/projects/";
    const response = fetch(projectDeleteURI + id, {
      method: "DELETE",
    });
    const responseToJson = await (await response).json();

    console.log(responseToJson.message);
    projectList();
  };

  const handleUpdate = async (key, id) => {
    setIsDisabled(false);
    console.log("ready to update");
    console.log("Edit item", id);
  };
  const handleUpdateSave = async (id) => {
    const projectDeleteURI = "http://localhost:4001/heat-loss/projects/";
    const response = fetch(projectDeleteURI + id, {
      method: "PATCH",
    });
    const responseToJson = await (await response).json();
    if (!response.ok) {
      setError(responseToJson.error);
      console.log(error);
    }
    if (response.ok) {
      setError(null);
      setProjectName("");
      console.log("new project added");
      projectList();
    }
  };
  return (
    <tr className="projects-table-data-row" key={key}>
      <td className="projects-table-name-cell">
        <span>{item.project_name}</span>
        <input
          type="text"
          value={item.project_name}
          placeholder={item.project_name}
          disabled={isDisabled}
        />
      </td>
      <td className="projects-table-cell edit">
        <FontAwesomeIcon
          onClick={(e) => handleUpdate(e.target.parent.parent.key)}
          icon={faPenToSquare}
          className="project-update-icon"
        />
      </td>
      <td className="projects-table-cell delete">
        <FontAwesomeIcon
          onClick={() => handleDelete(item.project_id)}
          icon={faTrash}
          className="project-delete-icon"
        />
        <FontAwesomeIcon
          onClick={() => handleUpdateSave(item.project_id)}
          icon={faFloppyDisk}
          className="project-save-on-update-icon"
        />
      </td>
    </tr>
  );
};

export default ProjectComponent;

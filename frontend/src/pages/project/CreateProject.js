import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

const CreateProject = (props) => {
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProject = {
      project_name: projectName,
      owner_id: 8,
    };

    const createProjectURI = "http://localhost:4001/heat-loss/projects/create";

    const response = await fetch(createProjectURI, {
      method: "POST",
      body: JSON.stringify(newProject),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseToJson = await response.json();
    if (!response.ok) {
      setError(responseToJson.error);
      console.log(error);
    }
    if (response.ok) {
      setError(null);
      setProjectName("");
      console.log("new project added");
      props.projectList();
    }
  };

  return (
    <tr className="project-table-create-row">
      <td className="create-project-cell-input">
        <form className="create-project">
          <input
            // ref={createProjectRef}
            placeholder="type in for new project"
            create-project-cell-icon
            type="text"
            onChange={(e) => setProjectName(e.target.value)}
            onFocus={() => setError(undefined)}
            value={projectName}
          />
          {error && <span className="create-project-error"> {error} </span>}
        </form>
      </td>
      <td className="create-project-cell-icon">
        <FontAwesomeIcon onClick={(e) => handleSubmit(e)} icon={faFloppyDisk} />
      </td>
    </tr>
  );
};

export default CreateProject;

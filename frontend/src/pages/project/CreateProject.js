import { useState } from "react";
import { useProjectsContext } from "../../hooks/useProjectsContext";

const CreateProject = (props) => {
  const { apiCalls, uiCalls } = useProjectsContext();
  const [projectName, setProjectName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProject = {
      project_name: projectName,
      owner_id: 8,
    };

    apiCalls.createProject(newProject);
    setProjectName("");
  };

  return (
    <tr className="items-table-save-row">
      <td className="items-table-cell-save">
        <form className="create-form-in-table-row " onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="type in for a new project"
            name="project_name"
            onChange={(e) => setProjectName(e.target.value)}
            // onFocus={() => setParentError(undefined)}
            value={projectName}
            autoFocus
          />
          <button onClick={(e) => handleSubmit(e)}>
            <span className="material-symbols-outlined">save</span>
          </button>
          <button onClick={() => props.setParentToggle(false)}>
            <span className="material-symbols-outlined">cancel</span>
          </button>
        </form>
      </td>
    </tr>
  );
};

export default CreateProject;

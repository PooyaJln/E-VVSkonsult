import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useProjectsContext } from "../../hooks/useProjectsContext";

import { createProject } from "../../slices/projects/projectsSlice";

const CreateProject = ({ setParentToggle, setParentError }) => {
  // const { dispatch } = useProjectsContext();
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState("");

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
      setParentError(responseToJson.error);
    }
    if (response.ok) {
      setParentToggle(false);
      setProjectName("");
      console.log("new project added");
      // dispatch({ type: "CREATE_PROJECT", payload: responseToJson });
      dispatch(createProject(responseToJson));
    }
  };

  return (
    // <tr className="items-table-create-row">
    //   <td className="create-item-cell-input">
    //     <Form
    //       method="post"
    //       action="/heat-loss/projects"
    //       id="projectCreateForm"
    //       className="create-item"
    //       ref={formRef}
    //     >
    //       <input
    //         type="text"
    //         placeholder="type in for a new project"
    //         name="project_name"
    //         ref={inputRef}
    //         onClick={inputClick}
    //       />
    //       {/* <button>
    //         <FontAwesomeIcon
    //           icon={faFloppyDisk}
    //           type="submit"
    //           from="projectCreateForm"
    //         />
    //       </button> */}
    //       {error && <span className="create-item-error"> {error} </span>}
    //     </Form>
    //   </td>
    //   <td className="create-item-cell-icon">
    //     <button form="projectCreateForm">
    //       <FontAwesomeIcon icon={faFloppyDisk} />
    //     </button>
    //   </td>
    // </tr>
    <tr className="items-table-save-row">
      <td className="items-table-cell-save">
        <form className="create-form-in-table-row " onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="type in for a new project"
            name="project_name"
            onChange={(e) => setProjectName(e.target.value)}
            onFocus={() => setParentError(undefined)}
            value={projectName}
            autoFocus
          />
          <button onClick={(e) => handleSubmit(e)}>
            <span class="material-symbols-outlined">save</span>
          </button>
          <button onClick={() => setParentToggle(false)}>
            <span class="material-symbols-outlined">cancel</span>
          </button>
        </form>
      </td>
    </tr>
  );
};

export default CreateProject;

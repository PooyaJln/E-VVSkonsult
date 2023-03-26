import { useEffect, useRef, useState } from "react";

import ErrorDialog from "../../components/ErrorDialog";
import { useProjectsContext } from "../../hooks/useProjectsContext";

import CreateProject from "./CreateProject";
import ProjectTableRow from "./ProjectTableRow";

const ItemsList = () => {
  // const [projects, setProjects] = useState(null);
  let { projects, dispatch } = useProjectsContext();
  const [toggle, setToggle] = useState(false);
  // const [projectName, setProjectName] = useState("");
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  // const inputRef = useRef();

  useEffect(() => {
    let allProjectsURI = "http://localhost:4001/heat-loss/projects/all";
    const fetchProjects = async () => {
      const response = await fetch(allProjectsURI);
      const responseJson = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_PROJECTS", payload: responseJson });
      }
    };

    fetchProjects();
  }, [dispatch]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const newProject = {
  //     project_name: projectName,
  //     owner_id: 8,
  //   };

  //   const createProjectURI = "http://localhost:4001/heat-loss/projects/create";

  //   const response = await fetch(createProjectURI, {
  //     method: "POST",
  //     body: JSON.stringify(newProject),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   const responseToJson = await response.json();
  //   if (!response.ok) {
  //     setError(responseToJson.error);
  //     console.log(error);
  //   }
  //   if (response.ok) {
  //     setError(null);
  //     setProjectName("");
  //     setToggle(false);
  //     console.log("new project added");
  //     dispatch({ type: "CREATE_PROJECT", payload: responseToJson });
  //   }
  // };

  // const handleDelete = async (id) => {
  //   if (
  //     window.confirm(
  //       "Are you sure you want to delete this project? All buildings and apartments will be deleted as well"
  //     )
  //   ) {
  //     const projectDeleteURI = "http://localhost:4001/heat-loss/projects/";
  //     const response = await fetch(projectDeleteURI + id, {
  //       method: "DELETE",
  //     });
  //     const responseToJson = await response.json();

  //     if (response.ok) {
  //       dispatch({ type: "DELETE_PROJECT", payload: responseToJson });
  //     }
  //   }
  // };

  const setParentToggle = (value) => {
    setToggle(value);
  };

  const setParentError = (value) => {
    setError(value);
    setOpen(true);
  };
  const setParentOpen = () => {
    setOpen(false);
  };
  // const handlePlusButtonClick = () => {
  //   setToggle(true);
  //   setTimeout(() => {
  //     inputRef.current.focus();
  //     inputRef.current.scrollIntoView();
  //   }, 0);
  // };

  return (
    <>
      {error && (
        <ErrorDialog error={error} open={open} setParentOpen={setParentOpen} />
      )}
      <div className="items">
        <div>
          {/* <button onClick={handlePlusButtonClick}> */}
          <button onClick={() => setToggle(true)}>
            <span className="material-symbols-outlined">add</span>
          </button>
          <span>add a project</span>
        </div>
        <table className="items-table">
          <tbody>
            <tr className="items-table-headers" key={1}>
              <th>Project name</th>
              <th></th>
            </tr>
            {toggle ? (
              <CreateProject
                toggle={toggle}
                setParentToggle={setParentToggle}
                setParentError={setParentError}
                open={open}
                setParentOpen={setParentOpen}
              />
            ) : null}

            {projects &&
              projects.map((project, index) => (
                <ProjectTableRow
                  key={index + 2}
                  project={project}
                  setParentError={setParentError}
                />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ItemsList;

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProjects,
  getProjectsStatus,
  getProjectsError,
  fetchProjects,
} from "../../slices/projects/projectsSlice";

import ErrorDialog from "../../components/ErrorDialog";
import { useProjectsContext } from "../../hooks/useProjectsContext";

import CreateProject from "./CreateProject";
import ProjectTableRow from "./ProjectTableRow";

const ItemsList = () => {
  // const [projects, setProjects] = useState(null);
  // let { projects, dispatch } = useProjectsContext();

  const projects = useSelector(getAllProjects);
  console.log("🚀 ~ file: ItemsList.js:21 ~ ItemsList ~ projects:", projects);
  const projectsStatus = useSelector(getProjectsStatus);
  const projectsError = useSelector(getProjectsError);
  const dispatch = useDispatch();

  const [toggle, setToggle] = useState(false);
  // const [projectName, setProjectName] = useState("");
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  // const inputRef = useRef();

  // // useEffect with context API
  // useEffect(() => {
  //   let allProjectsURI = "http://localhost:4001/heat-loss/projects/all";
  //   const fetchProjects = async () => {
  //     const response = await fetch(allProjectsURI);
  //     const responseJson = await response.json();

  //     if (response.ok) {
  //       // dispatch({ type: "SET_PROJECTS", payload: responseJson });
  //       dispatch({ type: "SET_PROJECTS", payload: responseJson });
  //     }
  //   };

  //   fetchProjects();
  // }, [dispatch]);

  useEffect(() => {
    if (projectsStatus === "idle") {
      dispatch(fetchProjects());
    }
  }, [projectsStatus, dispatch]);

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

  return <div>projects page</div>;
  // return (
  //   <>
  //     {error && (
  //       <ErrorDialog error={error} open={open} setParentOpen={setParentOpen} />
  //     )}
  //     <div className="items">
  //       <div>
  //         {/* <button onClick={handlePlusButtonClick}> */}
  //         <button onClick={() => setToggle(true)}>
  //           <span className="material-symbols-outlined">add</span>
  //         </button>
  //         <span>add a project</span>
  //       </div>
  //       <table className="items-table">
  //         <tbody>
  //           <tr className="items-table-headers" key={1}>
  //             <th>Project name</th>
  //             <th></th>
  //           </tr>
  //           {toggle ? (
  //             <CreateProject
  //               toggle={toggle}
  //               setParentToggle={setParentToggle}
  //               setParentError={setParentError}
  //               open={open}
  //               setParentOpen={setParentOpen}
  //             />
  //           ) : null}

  //           {projects &&
  //             projects.map((project, index) => (
  //               <ProjectTableRow
  //                 key={index + 2}
  //                 project={project}
  //                 setParentError={setParentError}
  //               />
  //             ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   </>
  // );
};

export default ItemsList;

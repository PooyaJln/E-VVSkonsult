import { useEffect, useState } from "react";

import ErrorDialog from "../../components/ErrorDialog";
import { useProjectsContext } from "../../hooks/useProjectsContext";

import CreateProject from "./CreateProject";
import ProjectTableRow from "./ProjectTableRow";

const ItemsList = () => {
  let { state, apiCalls } = useProjectsContext();
  let projects = state?.projects || [];
  let error = state?.error || undefined;
  // let toggle = state?.toggle || false;
  const [toggle, setToggle] = useState(false);

  const setParentToggle = (value) => {
    setToggle(value);
  };

  useEffect(() => {
    apiCalls.getProjects();
  }, []);

  return (
    <>
      {error && <ErrorDialog />}
      <div className="items">
        <div>
          {/* <button onClick={handlePlusButtonClick}> */}
          {/* <button onClick={() => uiCalls.setToggle(true)}> */}
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
            {/* {toggle ? <CreateProject /> : null} */}
            {toggle ? (
              <CreateProject setParentToggle={setParentToggle} />
            ) : null}

            {projects &&
              projects.map((project, index) => (
                <ProjectTableRow key={index + 2} project={project} />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ItemsList;

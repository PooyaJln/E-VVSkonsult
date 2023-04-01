import { useEffect } from "react";

import ErrorDialog from "../../components/ErrorDialog";
import { useProjectsContext } from "../../hooks/useProjectsContext";

import CreateProject from "./CreateProject";
import ProjectTableRow from "./ProjectTableRow";

const ItemsList = () => {
  let { state, apiCalls, uiCalls } = useProjectsContext();
  let projects = state?.projects || [];
  let error = state?.error || "";
  let toggle = state?.toggle || false;

  useEffect(() => {
    apiCalls.getProjects();
  }, [projects]);

  return (
    <>
      {error && <ErrorDialog />}
      <div className="items">
        <div>
          {/* <button onClick={handlePlusButtonClick}> */}
          <button onClick={() => uiCalls.setToggle(true)}>
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
            {toggle ? <CreateProject /> : null}

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

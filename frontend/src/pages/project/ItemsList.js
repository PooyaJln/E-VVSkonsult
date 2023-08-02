import { useEffect, useState } from "react";

import ErrorDialog from "../../components/ErrorDialog";
import { useProjectsContext } from "../../hooks/useProjectsContext";

import CreateProject from "./CreateProject";
import ProjectTableRow from "./ProjectTableRow";

const ItemsList = () => {
  let { state, apiCalls, uiCalls } = useProjectsContext();
  let projects = state?.projects || [];
  let error = state?.error;
  let open = state?.open;
  const createToggle = state?.createToggle;
  const [toggle, setToggle] = useState(false);

  const setParentToggle = (value) => {
    setToggle(value);
  };
  const setParentOpen = (value) => {
    uiCalls.setOpen(value);
  };
  const setParentError = (value) => {
    uiCalls.setError(value);
  };

  const handleCreatePlusButtonClick = () => {
    setToggle(true);
    uiCalls.setCreateToggle(true);
  };

  useEffect(() => {
    apiCalls.getProjects();
  }, []);

  return (
    <>
      {error && (
        <ErrorDialog
          error={error}
          open={open}
          setParentOpen={setParentOpen}
          setParentToggle={setParentToggle}
        />
      )}
      <div className="items">
        <div>
          <button onClick={handleCreatePlusButtonClick}>
            {/* <button onClick={() => uiCalls.setCreateToggle(true)}> */}
            {/* <button onClick={() => setToggle(true)}> */}
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
            {toggle && (
              <CreateProject
                error={error}
                setParentError={setParentError}
                setParentToggle={setParentToggle}
              />
            )}
            {/* ) : null} */}

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

import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import ErrorDialog from "../../components/ErrorDialog";

import CreateMaterial from "./CreateMaterial";
import MaterialTableRow from "./MaterialTableRow";

const ItemsList = () => {
  const project = useOutletContext();
  const project_id = useParams().project_id || project.project_id;

  const [components, setComponents] = useState(project?.components || []);
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const [trigger, setTrigger] = useState(0);

  const componentsList = async () => {
    let projectsDataURI =
      "http://localhost:4001/heat-loss/projects/" + project_id + "/data";
    const fetchProject = async () => {
      const response = await fetch(projectsDataURI);
      const responseJson = await response.json();
      if (response.ok) {
        setComponents(responseJson.components);
      }
    };

    fetchProject();
  };

  const setParentError = (value) => {
    setError(value);
    setOpen(true);
  };

  const setParentOpen = () => {
    setOpen(false);
  };
  const setParentToggle = (value) => {
    setToggle(value);
  };

  const handlePlusButtonClick = () => {
    setToggle(true);
    setTrigger(true);
  };

  // useEffect(() => {
  //   componentsList();
  // }, []);

  return (
    <>
      {error && (
        <ErrorDialog error={error} open={open} setParentOpen={setParentOpen} />
      )}
      <div className="items">
        <div>
          <button
            onClick={handlePlusButtonClick}
            // onClick={() => setToggle(true)}
          >
            <span className="material-symbols-outlined">add</span>
          </button>
          <span>add a Component</span>
        </div>
        <table className="materials-table">
          <tbody>
            <tr className="materials-table-headers-row" key={1}>
              <th className="materials-table-cell"> Name</th>
              <th className="materials-table-cell"> Category</th>
              <th className="materials-table-cell"> U-Value</th>
              <th className="materials-table-cell">
                <p>
                  Q<sub>inf</sub> factor
                </p>
              </th>
            </tr>
            {toggle ? (
              <CreateMaterial
                project={project}
                // toggle={toggle}
                setParentToggle={setParentToggle}
                setParentError={setParentError}
                setParentOpen={setParentOpen}
                // error={setError}
                components={components}
                setComponents={setComponents}
                componentsList={componentsList}
                // trigger={trigger}
              />
            ) : null}

            {components &&
              components.map((component, index) => (
                <MaterialTableRow
                  key={index + 2}
                  component={component}
                  components={components}
                  setComponents={setComponents}
                />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ItemsList;

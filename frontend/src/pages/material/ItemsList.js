import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import ErrorDialog from "../../components/ErrorDialog";

import CreateMaterial from "./CreateMaterial";
import MaterialTableRow from "./MaterialTableRow";
import { useComponentsContext } from "../../hooks/useComponentsContext";

const ItemsList = () => {
  const { state, apiCalls, uiCalls } = useComponentsContext();
  const project_id = useParams().project_id;
  let components = state?.items || [];
  // const [components, setComponents] = useState(project?.components || []);
  let error = state?.error || undefined;
  let open = state?.open || false;
  const createToggle = state?.createToggle;
  const [toggle, setToggle] = useState(false);

  const [trigger, setTrigger] = useState(0);

  const setParentToggle = (value) => {
    setToggle(value);
  };
  const setParentError = (value) => {
    uiCalls.setError(value);
  };
  const setParentOpen = (value) => {
    uiCalls.setOpen(value);
  };
  const handleCreatePlusButtonClick = () => {
    setToggle(true);
    uiCalls.setCreateToggle(true);
  };

  useEffect(() => {
    apiCalls.getItems(project_id);
  }, []);

  return (
    <>
      {error && (
        <ErrorDialog error={error} open={open} setParentOpen={setParentOpen} />
      )}
      <div className="items">
        <div>
          <button
            onClick={handleCreatePlusButtonClick}
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
            {toggle && createToggle && (
              <CreateMaterial setParentToggle={setParentToggle} />
            )}

            {components &&
              components.map((component, index) => (
                <MaterialTableRow key={index + 2} component={component} />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ItemsList;

import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useBuildingsContext } from "../../hooks/useBuildingsContext";

import CreateBuilding from "./CreateBuilding";
import BuildingsTableRow from "./BuildingsTableRow";
import ErrorDialog from "../../components/ErrorDialog";

const ItemsList = () => {
  const { state, apiCalls, uiCalls } = useBuildingsContext();
  const project_id = useParams().project_id;
  let buildings = state?.buildings || [];
  let error = state?.error || undefined;
  let open = state?.open || false;
  const createToggle = state?.createToggle;
  const [toggle, setToggle] = useState(false);

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
    apiCalls.getBuildings(project_id);
  }, []);

  // const project = useOutletContext();
  // const [buildings, setBuildings] = useState(project?.buildings || []);
  // const [error, setError] = useState(null);
  // const [open, setOpen] = useState(false);
  // const setParentError = (value) => {
  //   setError(value);
  //   setOpen(true);
  // };

  // const setParentOpen = () => {
  //   setOpen(false);
  // };

  // useEffect(() => {
  //   buildingsList();
  // }, []);

  // useEffect(() => {
  //   setBuildings(project?.buildings);
  // }, [project]);

  // const handleCreatePlusButtonClick = () => {
  //   setToggle(true);
  //   setTimeout(() => {
  //     createComponentInputRef.current.focus();
  //     createComponentInputRef.current.scrollIntoView();
  //   }, 0);
  // }
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
          <button
            onClick={handleCreatePlusButtonClick}
            // onClick={() => setToggle(true)}
          >
            <span className="material-symbols-outlined">add</span>
          </button>
          <span>add a building</span>
        </div>
        <table className="items-table">
          <tbody>
            <tr className="items-table-headers" key={1}>
              <th>Building name</th>
              <th></th>
            </tr>
            {toggle && createToggle && (
              <CreateBuilding setParentToggle={setParentToggle} />
            )}
            {/* ) : null} */}
            {buildings &&
              buildings.map((building, index) => (
                <BuildingsTableRow key={index + 2} building={building} />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ItemsList;

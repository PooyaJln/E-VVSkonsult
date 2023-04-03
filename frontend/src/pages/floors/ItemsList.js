import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFloorsContext } from "../../hooks/useFloorsContext";
import CreateFloor from "./CreateFloor";
import FloorsTableRow from "./FloorsTableRow";
import ErrorDialog from "../../components/ErrorDialog";

const ItemsList = () => {
  const { state, apiCalls, uiCalls } = useFloorsContext();
  const building_id = useParams().building_id;
  let floors = state?.items || [];
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
    apiCalls.getItems(building_id);
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
          <span>add a floor</span>
        </div>
        <table className="items-table">
          <tbody>
            <tr className="items-table-headers" key={1}>
              <th>Floor name</th>
              <th></th>
            </tr>
            {toggle && createToggle && (
              <CreateFloor setParentToggle={setParentToggle} />
            )}
            {/* ) : null} */}
            {floors &&
              floors.map((floor, index) => (
                <FloorsTableRow key={index + 2} building={floor} />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ItemsList;

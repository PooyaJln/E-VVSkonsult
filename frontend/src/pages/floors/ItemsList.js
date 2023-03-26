import { useEffect, useRef, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

import CreateFloor from "./CreateFloor";
import FloorsTableRow from "./FloorsTableRow";
import ErrorDialog from "../../components/ErrorDialog";

const ItemsList = (props) => {
  const building = props.building;

  const building_id = useParams().building_id || building.building_id;
  const [floors, setFloors] = useState(building?.floors || []);
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const floorsList = async () => {
    let BuildingDataURI =
      "http://localhost:4001/heat-loss/buildings/" + building_id;
    const fetchBuildingData = async () => {
      const response = await fetch(BuildingDataURI);
      const responseJson = await response.json();
      if (response.ok) {
        setFloors(responseJson.floors);
      }
    };

    fetchBuildingData();
  };

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const newItem = {
  //     building_name: itemName,
  //     project_id: project_id,
  //   };

  //   const createItemURI = "http://localhost:4001/heat-loss/buildings/create";

  //   const response = await fetch(createItemURI, {
  //     method: "POST",
  //     body: JSON.stringify(newItem),
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
  //     setBuildings([...buildings, responseToJson]);
  //     setError(null);
  //     setItemName("");
  //     setToggle(false);
  //   }
  // };

  // useEffect(() => {
  //   buildingsList();
  // }, []);

  // const handleCreatePlusButtonClick = () => {
  //   setToggle(true);
  //   setTimeout(() => {
  //     createComponentInputRef.current.focus();
  //     createComponentInputRef.current.scrollIntoView();
  //   }, 0);
  // };

  return (
    <>
      {/* {error && <ErrorDialog error={error} setError={setError} />} */}
      {error && (
        <ErrorDialog error={error} open={open} setParentOpen={setParentOpen} />
      )}

      <div className="items">
        <div>
          <button
            // onClick={handleCreatePlusButtonClick}
            onClick={() => setToggle(true)}
          >
            <span class="material-symbols-outlined">add</span>
          </button>
          <span>add a floor</span>
        </div>
        <table className="items-table">
          <tbody>
            <tr className="items-table-headers" key={1}>
              <th>Floor name</th>
              <th></th>
            </tr>
            {toggle ? (
              <>
                <CreateFloor
                  // toggle={toggle}
                  setParentToggle={setParentToggle}
                  setParentError={setParentError}
                  // open={open}
                  setParentOpen={setParentOpen}
                  buildings={floors}
                  setFloors={setFloors}
                  floorsList={floorsList}
                  // ref={createComponentInputRef}
                />
              </>
            ) : null}
            {floors &&
              floors.map((floor, index) => (
                <FloorsTableRow
                  key={index + 2}
                  floor={floor}
                  floors={floors}
                  setFloors={setFloors}
                  setParentError={setParentError}
                  open={open}
                  setParentOpen={setParentOpen}
                />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ItemsList;

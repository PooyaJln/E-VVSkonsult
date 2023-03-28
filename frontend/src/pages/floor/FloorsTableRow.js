import React, { useState } from "react";
import { Link } from "react-router-dom";

const FloorsTableRow = ({
  buildings,
  floor,
  floors,
  setFloors,
  setParentError,
}) => {
  const [isDisabled, setIsDisabled] = useState(true);

  const [itemName, setItemName] = useState(floor.storey_name);
  const [toggle, setToggle] = useState(true);

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this floor? All apartments will be deleted as well"
      )
    ) {
      const itemDeleteURI = "http://localhost:4001/heat-loss/stories/";
      const response = await fetch(itemDeleteURI + id, {
        method: "DELETE",
      });
      const responseToJson = await response.json();

      console.log(responseToJson.message);
      let _floors = floors.filter(
        (_floor) => _floor.storey_id !== responseToJson.storey_id
      );
      setFloors(_floors);
    }
  };

  const handleUpdate = async (id) => {
    setToggle(!toggle);
    setIsDisabled(false);
    console.log("ready to update");
    console.log("Edit item", id);
  };

  const handleUpdateSave = async (e, item) => {
    e.preventDefault();
    const itemToUpdate = {
      ...item,
      storey_name: itemName,
    };
    const floorUpdateURI = "http://localhost:4001/heat-loss/stories/";
    const response = await fetch(floorUpdateURI + item.storey_id, {
      method: "PATCH",
      body: JSON.stringify(itemToUpdate),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseToJson = await response.json();
    if (!response.ok) {
      console.log(responseToJson.error);
      setParentError(responseToJson.error);
      // setError(responseToJson.error);
      // console.log(error);
    }
    if (response.ok) {
      setParentError(null);
      setToggle(!toggle);
      let _floors = floors;
      let updatedFloor = _floors.find(
        (_floor) => _floor.storey_id === responseToJson.storey_id
      );
      Object.assign(updatedFloor, responseToJson);
      setFloors(_floors);
      // console.log("building updated");
    }
  };

  return (
    <tr className="items-table-data-row">
      <td className="items-table-cell-name">
        {toggle ? (
          <Link to={`${floor.storey_id}`} className="items-table-cell-name-a">
            {floor.storey_name}
          </Link>
        ) : (
          <>
            <form
              className="item-update-form"
              onSubmit={(e) => handleUpdateSave(e, floor)}
            >
              <input
                type="text"
                className="items-table-cell-name-input"
                value={itemName}
                placeholder={floor.storey_name}
                disabled={isDisabled}
                onChange={(e) => setItemName(e.target.value)}
                onSubmit={handleUpdateSave}
                autoFocus
              />
              <select name="floor-parent-select"></select>
            </form>
          </>
        )}
      </td>
      <td className="items-table-cell ">
        {toggle ? (
          <button onClick={() => handleUpdate(floor.storey_id)}>
            <span class="material-symbols-outlined">edit_note</span>
          </button>
        ) : (
          <>
            <button onClick={(e) => handleUpdateSave(e, floor)}>
              <span class="material-symbols-outlined">save</span>
            </button>
            <button onClick={() => setToggle(!toggle)}>
              <span class="material-symbols-outlined">cancel</span>
            </button>
          </>
        )}
      </td>
      <td className="items-table-cell">
        <button onClick={() => handleDelete(floor.storey_id)}>
          <span class="material-symbols-outlined">delete</span>
        </button>
      </td>
    </tr>
  );
};

export default FloorsTableRow;

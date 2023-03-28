import React, { useState } from "react";
import { Link } from "react-router-dom";

const ApartmentsTableRow = ({
  building,
  buildings,
  setBuildings,
  setParentError,
}) => {
  const [isDisabled, setIsDisabled] = useState(true);

  const [itemName, setItemName] = useState(building.building_name);
  const [toggle, setToggle] = useState(true);

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this building? All floors and apartments will be deleted as well"
      )
    ) {
      const itemDeleteURI = "http://localhost:4001/heat-loss/buildings/";
      const response = await fetch(itemDeleteURI + id, {
        method: "DELETE",
      });
      const responseToJson = await response.json();

      console.log(responseToJson.message);
      let _buildings = buildings.filter(
        (_building) => _building.building_id !== responseToJson.building_id
      );
      setBuildings(_buildings);
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
      building_name: itemName,
    };
    const projectUpdateURI = "http://localhost:4001/heat-loss/buildings/";
    const response = await fetch(projectUpdateURI + item.building_id, {
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
      let _buildings = buildings;
      let updatedBuilding = _buildings.find(
        (_building) => _building.building_id === responseToJson.building_id
      );
      Object.assign(updatedBuilding, responseToJson);
      setBuildings(_buildings);
      // console.log("building updated");
    }
  };

  return (
    <tr className="items-table-data-row">
      <td className="items-table-cell-name">
        {toggle ? (
          <Link
            to={`${building.building_id}`}
            className="items-table-cell-name-a"
          >
            {building.building_name}
          </Link>
        ) : (
          <>
            <form
              className="item-update-form"
              onSubmit={(e) => handleUpdateSave(e, building)}
            >
              <input
                type="text"
                className="items-table-cell-name-input"
                value={itemName}
                placeholder={building.building_name}
                disabled={isDisabled}
                onChange={(e) => setItemName(e.target.value)}
                onSubmit={handleUpdateSave}
                autoFocus
              />
            </form>
          </>
        )}
      </td>
      <td className="items-table-cell ">
        {toggle ? (
          <button onClick={() => handleUpdate(building.building_id)}>
            <span class="material-symbols-outlined">edit_note</span>
          </button>
        ) : (
          <>
            <button onClick={(e) => handleUpdateSave(e, building)}>
              <span class="material-symbols-outlined">save</span>
            </button>
            <button onClick={() => setToggle(!toggle)}>
              <span class="material-symbols-outlined">cancel</span>
            </button>
          </>
        )}
      </td>
      <td className="items-table-cell">
        <button onClick={() => handleDelete(building.building_id)}>
          <span class="material-symbols-outlined">delete</span>
        </button>
      </td>
    </tr>
  );
};

export default ApartmentsTableRow;

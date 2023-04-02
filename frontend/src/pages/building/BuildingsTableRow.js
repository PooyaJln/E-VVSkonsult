import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useBuildingsContext } from "../../hooks/useBuildingsContext";

const BuildingsTableRow = ({ building }) => {
  const { state, apiCalls, uiCalls } = useBuildingsContext();

  const [updateToggle, setUpdateToggle] = useState(false);
  const [itemName, setItemName] = useState(building.building_name);

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this building? All floors and apartments will be deleted as well"
      )
    ) {
      apiCalls.deleteBuilding(id);
    }
  };

  const handleUpdateIconClick = async (item) => {
    setUpdateToggle(!updateToggle);
    setItemName(item.building_name);
    console.log("Edit item", item.building_name);
  };

  const handleUpdateSave = async (e, item) => {
    e.preventDefault();
    const itemToUpdate = {
      ...item,
      building_name: itemName,
    };
    apiCalls.updateBuilding(item.building_id, itemToUpdate);
    setUpdateToggle(!updateToggle);
  };

  return (
    <tr className="items-table-data-row">
      <td className="items-table-cell-name">
        {!updateToggle ? (
          <Link
            to={`${building.building_id}`}
            className="items-table-cell-name-a"
          >
            {building.building_name}
          </Link>
        ) : (
          <form
            className="item-update-form"
            onSubmit={(e) => handleUpdateSave(e, building)}
          >
            <input
              type="text"
              className="items-table-cell-name-input"
              placeholder={building.building_name}
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              autoFocus
            />
          </form>
        )}
      </td>
      <td className="items-table-cell ">
        {!updateToggle ? (
          <button onClick={() => handleUpdateIconClick(building)}>
            <span className="material-symbols-outlined">edit_note</span>
          </button>
        ) : (
          <>
            <button onClick={(e) => handleUpdateSave(e, building)}>
              <span className="material-symbols-outlined">save</span>
            </button>
            <button onClick={() => setUpdateToggle(!updateToggle)}>
              <span className="material-symbols-outlined">cancel</span>
            </button>
          </>
        )}
      </td>
      <td className="items-table-cell">
        <button onClick={() => handleDelete(building.building_id)}>
          <span className="material-symbols-outlined">delete</span>
        </button>
      </td>
    </tr>
  );
};

export default BuildingsTableRow;

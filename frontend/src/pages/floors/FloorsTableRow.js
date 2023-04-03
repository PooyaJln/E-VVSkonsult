import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFloorsContext } from "../../hooks/useFloorsContext";

const FloorsTableRow = ({ building: floor }) => {
  const { state, apiCalls, uiCalls } = useFloorsContext();

  const [updateToggle, setUpdateToggle] = useState(false);
  const [itemName, setItemName] = useState(floor.storey_name);

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this floor? All apartments and rooms will be deleted as well"
      )
    ) {
      apiCalls.deleteItem(id);
    }
  };

  const handleUpdateIconClick = async (item) => {
    setUpdateToggle(!updateToggle);
    setItemName(item.storey_name);
    console.log("Edit item", item.storey_name);
  };

  const handleUpdateSave = async (e, item) => {
    e.preventDefault();
    const itemToUpdate = {
      ...item,
      storey_name: itemName,
    };
    apiCalls.updateItem(item.storey_id, itemToUpdate);
    setUpdateToggle(!updateToggle);
  };

  return (
    <tr className="items-table-data-row">
      <td className="items-table-cell-name">
        {!updateToggle ? (
          <Link to={`${floor.storey_id}`} className="items-table-cell-name-a">
            {floor.storey_name}
          </Link>
        ) : (
          <form
            className="item-update-form"
            onSubmit={(e) => handleUpdateSave(e, floor)}
          >
            <input
              type="text"
              className="items-table-cell-name-input"
              placeholder={floor.storey_name}
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              autoFocus
            />
          </form>
        )}
      </td>
      <td className="items-table-cell ">
        {!updateToggle ? (
          <button onClick={() => handleUpdateIconClick(floor)}>
            <span className="material-symbols-outlined">edit_note</span>
          </button>
        ) : (
          <>
            <button onClick={(e) => handleUpdateSave(e, floor)}>
              <span className="material-symbols-outlined">save</span>
            </button>
            <button onClick={() => setUpdateToggle(!updateToggle)}>
              <span className="material-symbols-outlined">cancel</span>
            </button>
          </>
        )}
      </td>
      <td className="items-table-cell">
        <button onClick={() => handleDelete(floor.storey_id)}>
          <span className="material-symbols-outlined">delete</span>
        </button>
      </td>
    </tr>
  );
};

export default FloorsTableRow;

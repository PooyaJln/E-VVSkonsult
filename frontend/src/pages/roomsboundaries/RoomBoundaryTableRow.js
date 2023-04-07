import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRoomsContext } from "../../hooks/useRoomsContext";
import { useRoomBoundariesContext } from "../../hooks/useRoomBoundariesContext";

const RoomBoundaryTableRow = ({ roomBoundary }) => {
  const { state, apiCalls, uiCalls } = useRoomBoundariesContext();

  const [updateToggle, setUpdateToggle] = useState(false);
  const [itemName, setItemName] = useState(roomBoundary?.boundary_name || "");

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      apiCalls.deleteItem(id);
    }
  };

  const handleUpdateIconClick = async (item) => {
    setUpdateToggle(!updateToggle);
    setItemName(item.boundary_name);
    console.log("Edit item", item.boundary_name);
  };

  const handleUpdateSave = async (e, item) => {
    e.preventDefault();
    const itemToUpdate = {
      ...item,
      boundary_name: itemName,
    };
    apiCalls.updateItem(item.boundary_id, itemToUpdate);
    setUpdateToggle(!updateToggle);
  };

  return (
    <>
      <li className="boundary-items-list-row">
        {!updateToggle ? (
          <span>{roomBoundary?.boundary_name}</span>
        ) : (
          <form>
            <input
              type="text"
              placeholder={roomBoundary?.boundary_name}
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              autoFocus
            />
          </form>
        )}

        {!updateToggle ? (
          <button onClick={() => handleUpdateIconClick(roomBoundary)}>
            <span className="material-symbols-outlined">edit_note</span>
          </button>
        ) : (
          <>
            <button onClick={(e) => handleUpdateSave(e, roomBoundary)}>
              <span className="material-symbols-outlined">save</span>
            </button>
            <button onClick={() => setUpdateToggle(!updateToggle)}>
              <span className="material-symbols-outlined">cancel</span>
            </button>
          </>
        )}

        <button onClick={() => handleDelete(roomBoundary?.boundary_id)}>
          <span className="material-symbols-outlined">delete</span>
        </button>
      </li>
      {/* <tr className="items-table-data-row">
      <td className="items-table-cell-name">
        {!updateToggle ? (
          <span className="items-table-cell-name-a">
            {roomBoundary?.boundary_name}
          </span>
        ) : (
          <form className="item-update-form">
            <input
              type="text"
              className="items-table-cell-name-input"
              placeholder={roomBoundary?.boundary_name}
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              autoFocus
            />
          </form>
        )}
      </td>
      <td className="items-table-cell ">
        {!updateToggle ? (
          <button onClick={() => handleUpdateIconClick(roomBoundary)}>
            <span className="material-symbols-outlined">edit_note</span>
          </button>
        ) : (
          <>
            <button onClick={(e) => handleUpdateSave(e, roomBoundary)}>
              <span className="material-symbols-outlined">save</span>
            </button>
            <button onClick={() => setUpdateToggle(!updateToggle)}>
              <span className="material-symbols-outlined">cancel</span>
            </button>
          </>
        )}
      </td>
      <td className="items-table-cell">
        <button onClick={() => handleDelete(roomBoundary?.boundary_id)}>
          <span className="material-symbols-outlined">delete</span>
        </button>
      </td>
    </tr> */}
    </>
  );
};

export default RoomBoundaryTableRow;

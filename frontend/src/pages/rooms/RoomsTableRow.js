import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRoomsContext } from "../../hooks/useRoomsContext";

const RoomsTableRow = ({ room }) => {
  const { state, apiCalls, uiCalls } = useRoomsContext();

  const [updateToggle, setUpdateToggle] = useState(false);
  const [itemName, setItemName] = useState(room.room_name);

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this room? All walls in it will be deleted as well!"
      )
    ) {
      apiCalls.deleteItem(id);
    }
  };

  const handleUpdateIconClick = async (item) => {
    setUpdateToggle(!updateToggle);
    setItemName(item.room_name);
    console.log("Edit item", item.room_name);
  };

  const handleUpdateSave = async (e, item) => {
    e.preventDefault();
    const itemToUpdate = {
      ...item,
      room_name: itemName,
    };
    apiCalls.updateItem(item.room_id, itemToUpdate);
    setUpdateToggle(!updateToggle);
  };

  return (
    <tr className="items-table-data-row">
      <td className="items-table-cell-name">
        {!updateToggle ? (
          <Link to={`${room.room_id}`} className="items-table-cell-name-a">
            {room.room_name}
          </Link>
        ) : (
          <form
            className="item-update-form"
            onSubmit={(e) => handleUpdateSave(e, room)}
          >
            <input
              type="text"
              className="items-table-cell-name-input"
              placeholder={room.room_name}
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              autoFocus
            />
          </form>
        )}
      </td>
      <td className="items-table-cell ">
        {!updateToggle ? (
          <button onClick={() => handleUpdateIconClick(room)}>
            <span className="material-symbols-outlined">edit_note</span>
          </button>
        ) : (
          <>
            <button onClick={(e) => handleUpdateSave(e, room)}>
              <span className="material-symbols-outlined">save</span>
            </button>
            <button onClick={() => setUpdateToggle(!updateToggle)}>
              <span className="material-symbols-outlined">cancel</span>
            </button>
          </>
        )}
      </td>
      <td className="items-table-cell">
        <button onClick={() => handleDelete(room.room_id)}>
          <span className="material-symbols-outlined">delete</span>
        </button>
      </td>
    </tr>
  );
};

export default RoomsTableRow;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useApartmentsContext } from "../../hooks/useApartmentsContext";

const ApartmentsTableRow = ({ apartment }) => {
  const { state, apiCalls, uiCalls } = useApartmentsContext();

  const [updateToggle, setUpdateToggle] = useState(false);
  const [itemName, setItemName] = useState(apartment.apartment_name);

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this apartment? All rooms in it will be deleted as well!"
      )
    ) {
      apiCalls.deleteItem(id);
    }
  };

  const handleUpdateIconClick = async (item) => {
    setUpdateToggle(!updateToggle);
    setItemName(item.apartment_name);
    console.log("Edit item", item.apartment_name);
  };

  const handleUpdateSave = async (e, item) => {
    e.preventDefault();
    const itemToUpdate = {
      ...item,
      apartment_name: itemName,
    };
    apiCalls.updateItem(item.apartment_id, itemToUpdate);
    setUpdateToggle(!updateToggle);
  };

  return (
    <tr className="items-table-data-row">
      <td className="items-table-cell-name">
        {!updateToggle ? (
          <Link
            to={`${apartment.apartment_id}`}
            className="items-table-cell-name-a"
          >
            {apartment.apartment_name}
          </Link>
        ) : (
          <form
            className="item-update-form"
            onSubmit={(e) => handleUpdateSave(e, apartment)}
          >
            <input
              type="text"
              className="items-table-cell-name-input"
              placeholder={apartment.apartment_name}
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              autoFocus
            />
          </form>
        )}
      </td>
      <td className="items-table-cell ">
        {!updateToggle ? (
          <button onClick={() => handleUpdateIconClick(apartment)}>
            <span className="material-symbols-outlined">edit_note</span>
          </button>
        ) : (
          <>
            <button onClick={(e) => handleUpdateSave(e, apartment)}>
              <span className="material-symbols-outlined">save</span>
            </button>
            <button onClick={() => setUpdateToggle(!updateToggle)}>
              <span className="material-symbols-outlined">cancel</span>
            </button>
          </>
        )}
      </td>
      <td className="items-table-cell">
        <button onClick={() => handleDelete(apartment.apartment_id)}>
          <span className="material-symbols-outlined">delete</span>
        </button>
      </td>
    </tr>
  );
};

export default ApartmentsTableRow;

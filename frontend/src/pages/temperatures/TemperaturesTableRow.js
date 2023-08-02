import React, { useState } from "react";
import { useTemperaturesContext } from "../../hooks/useTemperaturesContext";

const TemperaturesTableRow = ({ temperature }) => {
  const { apiCalls } = useTemperaturesContext();

  const [updateToggle, setUpdateToggle] = useState(false);
  const [itemName, setItemName] = useState(temperature.temperature_name);
  const [itemValue, setItemValue] = useState(temperature.temperature_value);

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this temperature? All rooms and components using it should be updated as well!"
      )
    ) {
      apiCalls.deleteItem(id);
    }
  };

  const handleUpdateIconClick = async (item) => {
    setUpdateToggle(!updateToggle);
    setItemName(item.temperature_name);
    setItemValue(item.temperature_value);
  };

  const handleUpdateSave = async (e, item) => {
    e.preventDefault();
    const itemToUpdate = {
      ...item,
      temperature_name: itemName,
      temperature_value: itemValue,
    };
    apiCalls.updateItem(item.temperature_id, itemToUpdate);
    setUpdateToggle(!updateToggle);
  };

  return (
    <tr className="materials-table-data-row">
      <td className="materials-table-cell">
        {!updateToggle ? (
          <span className="materials-table-cell-name-span">
            {temperature.temperature_name}
          </span>
        ) : (
          <input
            type="text"
            className="materials-table-cell-name-input"
            placeholder={temperature.temperature_name}
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            autoFocus
          />
        )}
      </td>
      <td className="materials-table-cell">
        {!updateToggle ? (
          <span className="materials-table-cell-categ-span">
            {temperature.temperature_value}
          </span>
        ) : (
          <input
            type="text"
            className="materials-table-cell-name-input"
            placeholder={temperature.temperature_value}
            value={itemValue}
            onChange={(e) => setItemValue(e.target.value)}
          />
        )}
      </td>
      <td className="materials-table-cell">
        {!updateToggle ? (
          <button onClick={() => handleUpdateIconClick(temperature)}>
            <span className="material-symbols-outlined">edit_note</span>
          </button>
        ) : (
          <>
            <button onClick={(e) => handleUpdateSave(e, temperature)}>
              <span className="material-symbols-outlined">save</span>
            </button>
            <button onClick={() => setUpdateToggle(!updateToggle)}>
              <span className="material-symbols-outlined">cancel</span>
            </button>
          </>
        )}
      </td>
      <td className="materials-table-cell">
        <button onClick={() => handleDelete(temperature.temperature_id)}>
          <span className="material-symbols-outlined">delete</span>
        </button>
      </td>
    </tr>
  );
};

export default TemperaturesTableRow;

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

const ItemTableRow = ({ thermalParameter, project }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [itemValue, setItemValue] = useState(thermalParameter.parameter_value);
  const [toggle, setToggle] = useState(true);

  const handleUpdate = async (id) => {
    setToggle(!toggle);
    setIsDisabled(false);
    console.log("ready to update");
    console.log("Edit item", id);
  };

  const handleUpdateSave = async (e, item) => {
    e.preventDefault();
    const itemToUpdate = {
      parameter_value: itemValue,
    };
    const projectUpdateURI = `http://localhost:4001/heat-loss/thermal-parameters/${item.parameter_id}`;
    const response = await fetch(projectUpdateURI, {
      method: "PATCH",
      body: JSON.stringify(itemToUpdate),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseToJson = await response.json();
    if (!response.ok) {
      setError(responseToJson.error);
      console.log(error);
    }
    if (response.ok) {
      setError(null);
      setToggle(!toggle);
      console.log("parameter updated");
    }
  };

  return (
    <tr className="thermalpara-table-data-row">
      <td className="thermalpara-table-cell-name">
        {thermalParameter.parameter_name}
      </td>
      <td className="thermalpara-table-cell ">
        {toggle ? (
          <span>{thermalParameter.parameter_value}</span>
        ) : (
          <>
            <form
              className="thermalpara-update-form"
              onSubmit={(e) => handleUpdateSave(e, thermalParameter)}
            >
              <input
                type="text"
                className="thermalpara-table-cell-name-input"
                value={itemValue}
                placeholder={thermalParameter.parameter_value}
                disabled={isDisabled}
                onChange={(e) => setItemValue(e.target.value)}
                onSubmit={handleUpdateSave}
              />
            </form>
            {!toggle && error && (
              <span className="create-thermalpara-error"> {error} </span>
            )}
          </>
        )}
      </td>
      <td className="thermalpara-table-cell ">
        {thermalParameter.parameter_unit}
      </td>
      <td className="thermalpara-table-cell-icon ">
        {toggle ? (
          <FontAwesomeIcon
            onClick={() => handleUpdate(thermalParameter.parameter_id)}
            icon={faPenToSquare}
            className="thermalpara-update-icon"
          />
        ) : (
          <FontAwesomeIcon
            onClick={(e) => handleUpdateSave(e, thermalParameter)}
            icon={faFloppyDisk}
            className="thermalpara-save-on-update-icon"
          />
        )}
      </td>
    </tr>
  );
};

export default ItemTableRow;

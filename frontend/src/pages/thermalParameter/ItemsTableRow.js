import React, { useState } from "react";
import { useProjectDataContext } from "../../hooks/useProjectDataContext";
import { useParametersContext } from "../../hooks/useParametersContext";
import { useParams } from "react-router-dom";

const ItemsTableRow = ({ thermalParameter }) => {
  const { project_id } = useParams();
  const { state, apiCalls, uiCalls } = useParametersContext();

  const [updateToggle, setUpdateToggle] = useState(false);
  const [itemValue, setItemValue] = useState(
    thermalParameter?.parameter_value || ""
  );

  const handleUpdateIconClick = async (item) => {
    setUpdateToggle(!updateToggle);
    setItemValue(item.parameter_value);
    console.log("Edit item", item.parameter_name);
  };

  const handleUpdateSave = async (e, item) => {
    e.preventDefault();

    if (!item?.parameter_id) {
      let newItem = {
        project_id: project_id,
        parameter_name: item.parameter_name,
        parameter_value: itemValue,
      };
      apiCalls.createItem(project_id, newItem);
      setUpdateToggle(!updateToggle);
    } else {
      let itemToUpdate = {
        parameter_value: itemValue,
      };
      apiCalls.updateItem(item.parameter_id, itemToUpdate);
      setUpdateToggle(!updateToggle);
    }

    // const projectUpdateURI = `http://localhost:4001/heat-loss/thermal-parameters/${item.parameter_id}`;
    // const response = await fetch(projectUpdateURI, {
    //   method: "PATCH",
    //   body: JSON.stringify(itemToUpdate),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // const responseToJson = await response.json();
    // if (!response.ok) {
    //   setError(responseToJson.error);
    //   console.log(error);
    // }
    // if (response.ok) {
    //   setError(null);
    //   setUpdateToggle(!updateToggle);
    //   console.log("parameter updated");
    // }
  };

  return (
    <tr className="thermalpara-table-data-row">
      <td className="thermalpara-table-cell-name">
        {thermalParameter.parameter_name}
      </td>
      <td className="thermalpara-table-cell ">
        {!updateToggle ? (
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
                onChange={(e) => setItemValue(e.target.value)}
              />
            </form>
            {!updateToggle && error && (
              <span className="create-thermalpara-error"> {error} </span>
            )}
          </>
        )}
      </td>
      <td className="thermalpara-table-cell ">
        {thermalParameter.parameter_unit}
      </td>
      <td className="thermalpara-table-cell-icon ">
        {!updateToggle ? (
          <button onClick={() => handleUpdateIconClick(thermalParameter)}>
            <span className="material-symbols-outlined">edit_note</span>
          </button>
        ) : (
          <>
            <button onClick={(e) => handleUpdateSave(e, thermalParameter)}>
              <span className="material-symbols-outlined">save</span>
            </button>
            <button onClick={() => setUpdateToggle(!updateToggle)}>
              <span className="material-symbols-outlined">cancel</span>
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default ItemsTableRow;

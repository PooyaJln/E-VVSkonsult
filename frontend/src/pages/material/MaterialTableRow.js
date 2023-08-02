import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import { useComponentsContext } from "../../hooks/useComponentsContext";

const ItemTableRow = ({ component }) => {
  const { apiCalls } = useComponentsContext();
  const [error, setError] = useState(null);
  const [itemName, setItemName] = useState(component.component_name);
  const [itemCateg, setItemCateg] = useState(component.component_categ);
  const [itemUvalue, setItemUvalue] = useState(component.component_uvalue);
  const [updateToggle, setUpdateToggle] = useState(false);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this component?")) {
      apiCalls.deleteItem(id);
    }
  };

  const handleUpdateIconClick = async (item) => {
    setUpdateToggle(!updateToggle);
    setItemName(item.component_name);
    setItemCateg(item.component_Categ);
    setItemUvalue(item.component_value);
  };

  const handleUpdateSave = async (e, item) => {
    e.preventDefault();
    const itemToUpdate = {
      ...item,
      component_name: itemName,
      component_categ: itemCateg,
      component_uvalue: itemUvalue,
    };

    apiCalls.updateItem(item.component_id, itemToUpdate);
    setUpdateToggle(!updateToggle);
  };

  return (
    <tr className="materials-table-data-row">
      <td className="materials-table-cell">
        {!updateToggle ? (
          <span className="materials-table-cell-name-span">
            {component.component_name}
          </span>
        ) : (
          <input
            type="text"
            className="materials-table-cell-name-input"
            value={itemName}
            placeholder={component.component_name}
            onChange={(e) => setItemName(e.target.value)}
          />
        )}
      </td>
      <td className="materials-table-cell">
        {!updateToggle ? (
          <span className="materials-table-cell-categ-span">
            {component.component_categ}
          </span>
        ) : (
          <select
            className="materials-table-cell-select-categ"
            value={itemCateg}
            placeholder={component.component_categ}
            onChange={(e) => setItemCateg(e.target.value)}
          >
            <option value="window">window</option>
            <option value="door">door</option>
            <option value="wall">wall</option>
            <option value="roof/floor slab">roof/floor slab</option>
          </select>
        )}
      </td>
      <td className="materials-table-cell">
        {!updateToggle ? (
          <span className="materials-table-cell-uvalue-span">
            {component.component_uvalue}
          </span>
        ) : (
          <input
            type="text"
            className="materials-table-cell-uvalue-input"
            value={itemUvalue}
            placeholder={component.component_uvalue}
            onChange={(e) => setItemUvalue(e.target.value)}
            onSubmit={handleUpdateSave}
          />
        )}
      </td>
      <td className="materials-table-cell">
        {component.thermalParameter?.parameter_value}
      </td>

      <td className="materials-table-cell-icon ">
        {!updateToggle ? (
          <button onClick={() => handleUpdateIconClick(component)}>
            <span className="material-symbols-outlined">edit_note</span>
          </button>
        ) : (
          <>
            <button onClick={(e) => handleUpdateSave(e, component)}>
              <span className="material-symbols-outlined">save</span>
            </button>
            <button onClick={() => setUpdateToggle(!updateToggle)}>
              <span className="material-symbols-outlined">cancel</span>
            </button>
          </>
        )}
      </td>
      <td className="materials-table-cell-icon">
        <button onClick={() => handleDelete(component.component_id)}>
          <span className="material-symbols-outlined">delete</span>
        </button>
      </td>
    </tr>
  );
};

export default ItemTableRow;

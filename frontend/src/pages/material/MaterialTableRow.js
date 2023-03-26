import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";

const ItemTableRow = ({ component, components, setComponents }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [itemName, setItemName] = useState(component.component_name);
  const [itemCateg, setItemCateg] = useState(component.component_categ);
  const [itemUvalue, setItemUvalue] = useState(component.component_uvalue);
  const [toggle, setToggle] = useState(true);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this component?")) {
      const itemDeleteURI = "http://localhost:4001/heat-loss/components/";
      const response = await fetch(itemDeleteURI + id, {
        method: "DELETE",
      });
      if (response.ok) {
        const responseToJson = await response.json();
        let _components = components.filter(
          (_component) =>
            _component.component_id !== responseToJson.component_id
        );
        setComponents(_components);
      }
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
      component_name: itemName,
      component_categ: itemCateg,
      component_uvalue: itemUvalue,
    };
    const projectUpdateURI = "http://localhost:4001/heat-loss/components/";
    const response = await fetch(projectUpdateURI + item.component_id, {
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
      console.log("building updated");
      let updatedComponent = components.find(
        (_component) => _component.component_id === responseToJson.component_id
      );
      Object.assign(updatedComponent, responseToJson);
      setComponents(components);
    }
  };

  return (
    <tr className="materials-table-data-row">
      <td className="materials-table-cell">
        {toggle ? (
          <span className="materials-table-cell-name-span">
            {component.component_name}
          </span>
        ) : (
          <input
            type="text"
            className="materials-table-cell-name-input"
            value={itemName}
            placeholder={component.component_name}
            disabled={isDisabled}
            onChange={(e) => setItemName(e.target.value)}
            onSubmit={handleUpdateSave}
          />
        )}
      </td>
      <td className="materials-table-cell">
        {toggle ? (
          <span className="materials-table-cell-categ-span">
            {component.component_categ}
          </span>
        ) : (
          <select
            className="materials-table-cell-select-categ"
            value={itemCateg}
            placeholder={component.component_categ}
            disabled={isDisabled}
            onChange={(e) => setItemCateg(e.target.value)}
            onSubmit={handleUpdateSave}
          >
            <option value="window">window</option>
            <option value="door">door</option>
            <option value="wall">wall</option>
            <option value="roof/floor slab">roof/floor slab</option>
          </select>
        )}
      </td>
      <td className="materials-table-cell">
        {toggle ? (
          <span className="materials-table-cell-uvalue-span">
            {component.component_uvalue}
          </span>
        ) : (
          <input
            type="text"
            className="materials-table-cell-uvalue-input"
            value={itemUvalue}
            placeholder={component.component_uvalue}
            disabled={isDisabled}
            onChange={(e) => setItemUvalue(e.target.value)}
            onSubmit={handleUpdateSave}
          />
        )}
      </td>
      <td className="materials-table-cell">
        {component.thermalParameter?.parameter_value}
      </td>

      <td className="materials-table-cell-icon ">
        {toggle ? (
          <button onClick={() => handleUpdate(component.component_id)}>
            <span class="material-symbols-outlined">edit_note</span>
          </button>
        ) : (
          <>
            <button onClick={(e) => handleUpdateSave(e, component)}>
              <span class="material-symbols-outlined">save</span>
            </button>
            <button onClick={() => setToggle(!toggle)}>
              <span class="material-symbols-outlined">cancel</span>
            </button>
          </>
        )}
      </td>
      <td className="materials-table-cell-icon">
        <button onClick={() => handleDelete(component.component_id)}>
          <span class="material-symbols-outlined">delete</span>
        </button>
      </td>
    </tr>
  );
};

export default ItemTableRow;

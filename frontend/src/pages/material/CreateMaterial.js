import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useComponentsContext } from "../../hooks/useComponentsContext";

const CreateItem = (props) => {
  const { state, apiCalls, uiCalls } = useComponentsContext();
  const project_id = useParams().project_id;

  const [itemName, setItemName] = useState("");
  const [itemCateg, setItemCateg] = useState("");
  const [itemUvalue, setItemUvalue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = {
      component_name: itemName,
      component_categ: itemCateg,
      component_uvalue: itemUvalue,
      project_id: project_id,
    };
    apiCalls.createItem(project_id, newItem);
    setItemName("");
    setItemCateg("");
    setItemUvalue("");
    !props.error ? props.setParentToggle(false) : props.setParentToggle(true);
  };

  return (
    <tr className="materials-table-data-row">
      <td className="materials-table-cell">
        <input
          className="create-material-input-name"
          placeholder="enter component name"
          type="text"
          onChange={(e) => setItemName(e.target.value)}
          value={itemName}
          autoFocus
        />
      </td>
      <td className="materials-table-cell">
        <select
          className="create-material-select-categ"
          onChange={(e) => setItemCateg(e.target.value)}
          value={itemCateg}
          required
        >
          <option value=""></option>
          <option value="wall">wall</option>
          <option value="roof/floor slab">roof/floor slab</option>
          <option value="window">window</option>
          <option value="door">door</option>
        </select>
      </td>
      <td className="materials-table-cell">
        <input
          className="create-material-input-uvalue"
          placeholder="enter the U-värde"
          type="text"
          onChange={(e) => setItemUvalue(e.target.value)}
          value={itemUvalue}
        />
      </td>
      <td className="materials-table-cell"></td>
      <td className="materials-table-cell-icon">
        <button onClick={(e) => handleSubmit(e)}>
          <span className="material-symbols-outlined">save</span>
        </button>
      </td>
      <td className="materials-table-cell-icon">
        <button onClick={() => props.setParentToggle(false)}>
          <span className="material-symbols-outlined">cancel</span>
        </button>
      </td>
    </tr>
  );
};

export default CreateItem;

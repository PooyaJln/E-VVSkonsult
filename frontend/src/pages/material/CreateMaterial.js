import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const CreateItem = ({
  project,
  components,
  setComponents,
  setParentToggle,
  setParentError,
  trigger,
}) => {
  const project_id = useParams().project_id || project?.project_id;

  const [itemName, setItemName] = useState("");
  const [itemCateg, setItemCateg] = useState("");
  const [itemUvalue, setItemUvalue] = useState("");

  const createFormRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = {
      component_name: itemName,
      component_categ: itemCateg,
      component_uvalue: itemUvalue,
      project_id: project_id,
    };

    const createItemURI = "http://localhost:4001/heat-loss/components/create";

    const response = await fetch(createItemURI, {
      method: "POST",
      body: JSON.stringify(newItem),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseToJson = await response.json();
    if (!response.ok) {
      setParentError(responseToJson.error);
    }
    if (response.ok) {
      setParentError(null);
      setItemName("");
      setItemCateg("");
      setItemUvalue("");
      setComponents([...components, responseToJson]);
      setParentToggle(false);
    }
  };

  const handlePlusButtonClick = () => {
    setParentToggle(true);
    // setTimeout(() => {
    //   createFormRef.current.scrollIntoView();
    // }, 0);
  };

  useEffect(() => {
    if (trigger) handlePlusButtonClick();
  }, [trigger]);

  // <form
  //   className="create-form-in-table-row"
  //   onSubmit={handleSubmit}
  //   ref={createFormRef}
  // >
  // </form>
  return (
    <tr className="materials-table-data-row">
      <td className="materials-table-cell">
        <input
          className="create-material-input-name"
          placeholder="enter component name"
          type="text"
          onChange={(e) => setItemName(e.target.value)}
          onFocus={() => setParentError(undefined)}
          value={itemName}
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
          onFocus={() => setParentError(undefined)}
          value={itemUvalue}
        />
      </td>
      <td className="materials-table-cell"></td>
      <td className="materials-table-cell-icon">
        <button onClick={(e) => handleSubmit(e)}>
          <span class="material-symbols-outlined">save</span>
        </button>
      </td>
      <td className="materials-table-cell-icon">
        <button onClick={() => setParentToggle(false)}>
          <span class="material-symbols-outlined">cancel</span>
        </button>
      </td>
    </tr>
  );
};

export default CreateItem;

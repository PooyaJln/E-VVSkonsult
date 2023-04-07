import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTemperaturesContext } from "../../hooks/useTemperaturesContext";

const CreateTemperature = (props) => {
  const project_id = useParams().project_id;
  const { apiCalls, uiCalls } = useTemperaturesContext;
  const [itemName, setItemName] = useState("");
  const [itemValue, setItemValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = {
      temperature_name: itemName,
      temperature_value: itemValue,
    };

    apiCalls.createItem(project_id, newItem);
    setItemName("");
    setItemValue("");
    !props.error ? props.setParentToggle(false) : props.setParentToggle(true);
  };

  // const handleCreatePlusButtonClick = () => {
  //   setParentToggle(true);
  //   setTimeout(() => {
  //     createComponentInputRef.current.focus();
  //   }, 0);
  // };

  // useImperativeHandle(ref, handleCreatePlusButtonClick);

  return (
    <tr className="materials-table-data-row">
      <td className="materials-table-cell">
        <input
          className="create-material-input-name"
          type="text"
          placeholder="name"
          name="temperature_name"
          onChange={(e) => setItemName(e.target.value)}
          value={itemName}
          autoFocus
        />
      </td>
      <td className="materials-table-cell">
        <input
          className="create-material-input-uvalue"
          type="text"
          placeholder="value"
          name="temperature_value"
          onChange={(e) => setItemValue(e.target.value)}
          value={itemValue}
        />
      </td>

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
      {/* <form className="create-form-in-table-row" onSubmit={handleSubmit}> */}
      {/* </form> */}
    </tr>
  );
};

export default CreateTemperature;

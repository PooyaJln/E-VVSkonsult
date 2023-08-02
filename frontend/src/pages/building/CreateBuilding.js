import { useState } from "react";
import { useParams } from "react-router-dom";
import { useBuildingsContext } from "../../hooks/useBuildingsContext";

const CreateBuilding = (props) => {
  const project_id = useParams().project_id;
  const { apiCalls, uiCalls } = useBuildingsContext();
  const [itemName, setItemName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = {
      building_name: itemName,
      project_id: project_id,
    };

    apiCalls.createBuilding(newItem);
    setItemName("");
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
    <tr className="items-table-save-row">
      <td className="items-table-cell-save">
        <form className="create-form-in-table-row" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="type in for a new building"
            name="building_name"
            onChange={(e) => setItemName(e.target.value)}
            value={itemName}
            autofocus
            // ref={createComponentInputRef}
          />
          <button onClick={(e) => handleSubmit(e)}>
            <span className="material-symbols-outlined">save</span>
          </button>
          <button onClick={() => props.setParentToggle(false)}>
            <span className="material-symbols-outlined">cancel</span>
          </button>
        </form>
      </td>
    </tr>
  );
};

export default CreateBuilding;

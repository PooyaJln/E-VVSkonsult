import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRoomsContext } from "../../hooks/useRoomsContext";

const CreateRoom = (props) => {
  const storey_id = useParams().floor_id;
  const { apiCalls, uiCalls } = useRoomsContext();
  const [itemName, setItemName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = {
      room_name: itemName,
    };

    apiCalls.createItem(storey_id, newItem);
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
            placeholder="type in for a new room"
            name="room_name"
            onChange={(e) => setItemName(e.target.value)}
            value={itemName}
            autoFocus
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

export default CreateRoom;

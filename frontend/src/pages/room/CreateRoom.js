import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const CreateRoom = ({
  project,
  buildings,
  setBuildings,
  setParentToggle,
  setParentError,
}) => {
  const project_id = useParams().project_id || project?.project_id;

  const [itemName, setItemName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = {
      building_name: itemName,
      project_id: project_id,
    };

    const createItemURI = "http://localhost:4001/heat-loss/buildings/create";

    const response = await fetch(createItemURI, {
      method: "POST",
      body: JSON.stringify(newItem),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseToJson = await response.json();
    if (!response.ok) {
      console.log(responseToJson.error);
      // setError(responseToJson.error);
      setParentError(responseToJson.error);
    }
    if (response.ok) {
      // setError(null);
      setItemName("");
      setParentToggle(false);
      let _buildings = [...buildings, responseToJson];
      setBuildings(_buildings);
    }
  };

  // const handleCreatePlusButtonClick = () => {
  //   setParentToggle(true);
  //   setTimeout(() => {
  //     createComponentInputRef.current.focus();
  //   }, 0);
  // };

  // useImperativeHandle(ref, handleCreatePlusButtonClick);

  return (
    // <form className="create-form" onSubmit={handleSubmit}>
    //   <h4>Create a new building</h4>
    //   <div>
    //     <input
    //       placeholder="type in for new building"
    //       type="text"
    //       onChange={(e) => setItemName(e.target.value)}
    //       onFocus={() => setError(undefined)}
    //       value={itemName}
    //     />
    //     <button>
    //       <FontAwesomeIcon
    //         onClick={(e) => handleSubmit(e)}
    //         icon={faFloppyDisk}
    //       />
    //     </button>
    //     {error && <span className="create-item-error"> {error} </span>}
    //   </div>
    // </form>
    <tr className="items-table-save-row">
      <td className="items-table-cell-save">
        <form className="create-form-in-table-row" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="type in for a new building"
            name="building_name"
            onChange={(e) => setItemName(e.target.value)}
            onFocus={() => setParentError(undefined)}
            value={itemName}
            autofocus
            // ref={createComponentInputRef}
          />
          <button onClick={(e) => handleSubmit(e)}>
            <span class="material-symbols-outlined">save</span>
          </button>
          <button onClick={() => setParentToggle(false)}>
            <span class="material-symbols-outlined">cancel</span>
          </button>

          {/* {error && <span className="create-item-error"> {error} </span>} */}
          {/* {error && <Alert severity="error">{error}</Alert>} */}
        </form>
      </td>
    </tr>
  );
};

export default CreateRoom;

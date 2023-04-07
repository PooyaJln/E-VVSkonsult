import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRoomsContext } from "../../hooks/useRoomsContext";
import { useRoomBoundariesContext } from "../../hooks/useRoomBoundariesContext";

const CreateRoomBoundary = (props) => {
  const room_id = useParams().room_id;
  let temperatures = props?.temperatures;

  const boundaryApiCalls = useRoomBoundariesContext().apiCalls;
  const boundaryUiCalls = useRoomBoundariesContext().uiCalls;

  const [itemName, setItemName] = useState("");
  const [boundaryType, setBoundaryType] = useState("");
  const [hasOpenings, setHasOpenings] = useState(false);
  const [isBetween0n1, setIsBetween0n1] = useState(false);
  const [isBetween1n6, setIsBetween1n6] = useState(false);
  const [area, setArea] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [isGroundConnected, setIsGroundConnected] = useState(false);
  const [uValueId, setuValueId] = useState("");
  const [outTempId, setoutTempId] = useState("");
  const [boundaryParentIid, setBoundaryParentId] = useState("");

  const handleBoundaryTypeChange = (e) => {
    setBoundaryType(e.target.value);
    if (e.target.value === "window" || e.target.value === "door") {
      setHasOpenings(false);
      setIsGroundConnected(false);
    }
  };
  const handleIsGroundConnectedChange = (e) => {
    if (e.target.value === "Yes") {
      setIsGroundConnected(true);
    } else if (e.target.value === "No") {
      setIsGroundConnected(false);
    }
    if (e.target.value === "No") {
      setIsBetween0n1(false);
      setIsBetween1n6(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = {
      boundary_name: itemName,
      boundary_type: boundaryType,
      has_openings: hasOpenings,
      groundConnected: isGroundConnected,
      isBetween0_1: isBetween0n1,
      isBetween1_6: isBetween1n6,
      area: area,
      uvalue_id: uValueId,
      out_temp_id: outTempId,
      boundary_parent_id: boundaryParentIid,
    };

    boundaryApiCalls.createItem(room_id, newItem);
    setItemName("");
    !props.error ? props.setParentToggle(false) : props.setParentToggle(true);
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="type in for a new room boundary"
          name="boundary_name"
          onChange={(e) => setItemName(e.target.value)}
          value={itemName}
          autoFocus
        />
        <span>Either enter dimensions</span>
        <input
          type="text"
          placeholder="length"
          name="boundary_length"
          onChange={(e) => setLength(e.target.value)}
          value={length}
        />
        <input
          type="text"
          placeholder="width"
          name="boundary_width"
          onChange={(e) => setWidth(e.target.value)}
          value={width}
        />
        <span>or only the area</span>
        <input
          type="text"
          placeholder="area"
          name="boundary_area"
          onChange={(e) => setArea(e.target.value)}
          value={area}
          required
        />
      </div>

      <div>
        <label for="boundary_type">Choose a type:</label>
        <select
          id="boundary_type"
          className="create-material-select-categ"
          onChange={handleBoundaryTypeChange}
          value={boundaryType}
          required
        >
          <option value="">choose an option</option>
          <option value="wall">wall</option>
          <option value="roof">roof slab</option>
          <option value="floor">floor slab</option>
          <option value="window">window</option>
          <option value="door">door</option>
        </select>
      </div>
      {boundaryType === "wall" ||
      boundaryType === "roof" ||
      boundaryType === "floor" ? (
        <div>
          <label for="hasOpening">any door/window in this wall/roof?:</label>
          <select
            id="hasOpening"
            className="create-material-select-categ"
            onChange={(e) => setHasOpenings(e.target.value)}
            value={hasOpenings}
            required
          >
            <option value=""></option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      ) : null}
      {boundaryType === "wall" || boundaryType === "floor" ? (
        <div>
          <label for="groundConnected">
            slab on ground / underground wall?:
          </label>
          <select
            id="groundConnected"
            onChange={handleIsGroundConnectedChange}
            value={isGroundConnected}
            required
          >
            <option value=""></option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      ) : null}
      {isGroundConnected ? (
        <div>
          <label for="isBetween0n1">
            is it between 0 to 1 meter from the building's border or under
            ground:
          </label>
          <select
            id="isBetween0n1"
            className="create-material-select-categ"
            onChange={(e) => setIsBetween0n1(e.target.value)}
            value={isBetween0n1}
            required
          >
            <option value=""></option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <label for="isBetween1n6">
            is it between 1 to 6 meter from the building's border or under
            ground:
          </label>
          <select
            id="isBetween1n6"
            className="create-material-select-categ"
            onChange={(e) => setIsBetween1n6(e.target.value)}
            value={isBetween1n6}
            required
          >
            <option value=""></option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      ) : null}
      <div>
        <label for="boundary_type">cold side temperature:</label>
        <select
          id="outTempId"
          className="create-material-select-categ"
          onChange={(e) => setoutTempId(e.target.value)}
          value={outTempId}
          required
        >
          <option value="">choose a temperature</option>
          {props.temperatures &&
            props.temperatures.map((temperature, index) => (
              <option key={index} value={temperature.temperature_id}>
                {temperature.temperature_name}
              </option>
            ))}
        </select>
      </div>
      <div>
        <button onClick={(e) => handleSubmit(e)}>
          <span className="material-symbols-outlined">save</span>
        </button>
        <button onClick={() => props.setParentToggle(false)}>
          <span className="material-symbols-outlined">cancel</span>
        </button>
      </div>
      {/* <form className="create-form-in-table-row"> */}
      {/* </form> */}
    </>
  );
};

export default CreateRoomBoundary;

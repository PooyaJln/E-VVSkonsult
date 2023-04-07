import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRoomsContext } from "../../hooks/useRoomsContext";
import CreateRoomBoundary from "./CreateRoomBoundary";
import RoomBoundaryTableRow from "./RoomBoundaryTableRow";
import ErrorDialog from "../../components/ErrorDialog";

const ItemsList = (props) => {
  const { state, apiCalls, uiCalls } = useRoomsContext();
  const room_id = useParams().room_id;
  let roomBoundaries = props.room.boundaries || [];
  let temperatures = props?.temperatures || [];

  let error = state?.error || undefined;
  let open = state?.open || false;
  const createToggle = state?.createToggle;
  const [toggle, setToggle] = useState(false);

  const setParentToggle = (value) => {
    setToggle(value);
  };
  const setParentError = (value) => {
    uiCalls.setError(value);
  };
  const setParentOpen = (value) => {
    uiCalls.setOpen(value);
  };
  const handleCreatePlusButtonClick = () => {
    setToggle(true);
    uiCalls.setCreateToggle(true);
  };

  return (
    <div className="room-boundaries">
      {error && (
        <ErrorDialog
          error={error}
          open={open}
          setParentOpen={setParentOpen}
          setParentToggle={setParentToggle}
        />
      )}

      <div className="boundary-items ">
        <div>
          <button
            onClick={handleCreatePlusButtonClick}
            // onClick={() => setToggle(true)}
          >
            <span className="material-symbols-outlined">add</span>
          </button>
          <span>add a wall / Door / Window</span>
        </div>
        <div className="create-room-boundary">
          {toggle && (
            <CreateRoomBoundary
              temperatures={temperatures}
              setParentToggle={setParentToggle}
            />
          )}
        </div>
        <div className="boundaries-list">
          <ul>
            {roomBoundaries &&
              roomBoundaries.map((roomBoundary, index) => (
                <RoomBoundaryTableRow
                  key={index + 2}
                  roomBoundary={roomBoundary}
                />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ItemsList;

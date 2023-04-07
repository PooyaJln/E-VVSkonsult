import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRoomsContext } from "../../hooks/useRoomsContext";
import CreateRoom from "./CreateRoom";
import RoomsTableRow from "./RoomsTableRow";
import ErrorDialog from "../../components/ErrorDialog";

const ItemsList = () => {
  const { state, apiCalls, uiCalls } = useRoomsContext();
  const apartment_id = useParams().apartment_id;
  let rooms = state?.items || [];
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

  useEffect(() => {
    apiCalls.getItems(apartment_id);
  }, []);

  return (
    <>
      {error && (
        <ErrorDialog
          error={error}
          open={open}
          setParentOpen={setParentOpen}
          setParentToggle={setParentToggle}
        />
      )}

      <div className="items">
        <div>
          <button
            onClick={handleCreatePlusButtonClick}
            // onClick={() => setToggle(true)}
          >
            <span className="material-symbols-outlined">add</span>
          </button>
          <span>add a room</span>
        </div>
        <table className="items-table">
          <tbody>
            <tr className="items-table-headers" key={1}>
              <th>Room name</th>
              <th></th>
            </tr>
            {toggle && <CreateRoom setParentToggle={setParentToggle} />}
            {/* ) : null} */}
            {rooms &&
              rooms.map((room, index) => (
                <RoomsTableRow key={index + 2} room={room} />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ItemsList;

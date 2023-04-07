import {
  Outlet,
  useLoaderData,
  useOutletContext,
  useParams,
} from "react-router-dom";
import RoomNavBar from "../../layouts/RoomNavBar";
import { useRoomsContext } from "../../hooks/useRoomsContext";
import { useEffect } from "react";
import ItemsList from "./ItemsList";
import { RoomBoundariesContextProvider } from "../../contexts/RoomBoundariesContext";

function Room() {
  const room_id = useParams().room_id;

  const { state, apiCalls } = useRoomsContext();
  const room = state?.item || {};
  useEffect(() => {
    apiCalls.getItem(room_id);
  }, [room_id]);
  return (
    <>
      <h2>Room: {room?.room_name}</h2>

      {/* <Outlet /> */}
      <RoomBoundariesContextProvider>
        <ItemsList />
      </RoomBoundariesContextProvider>
    </>
  );
}

export default Room;

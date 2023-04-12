import { useParams } from "react-router-dom";
import { useRoomsContext } from "../../hooks/useRoomsContext";
import { useEffect } from "react";
import { useTemperaturesContext } from "../../hooks/useTemperaturesContext";
import { RoomBoundariesContextProvider } from "../../contexts/RoomBoundariesContext";
import ItemsList from "../roomsboundaries/ItemsList";

function Room() {
  const room_id = useParams().room_id;
  const project_id = useParams().project_id;
  const roomState = useRoomsContext().state;
  const roomApiCalls = useRoomsContext().apiCalls;
  const room = roomState?.item || {};
  const temperatureApiCalls = useTemperaturesContext().apiCalls;
  const temperatureState = useTemperaturesContext().state;
  let temperatures = temperatureState?.items || [];

  useEffect(() => {
    roomApiCalls.getItem(room_id);
    temperatureApiCalls.getItems(project_id);
  }, [room_id, project_id]);

  return (
    <>
      <h2>Room: {room?.room_name}</h2>

      <RoomBoundariesContextProvider>
        <ItemsList room={room} temperatures={temperatures} />
      </RoomBoundariesContextProvider>
    </>
  );
}

export default Room;

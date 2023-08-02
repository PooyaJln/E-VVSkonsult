import { RoomBoundariesContextProvider } from "../../contexts/RoomBoundariesContext";
import ItemsList from "../roomsboundaries/ItemsList";

function Room() {
  return (
    <RoomBoundariesContextProvider>
      <ItemsList />
    </RoomBoundariesContextProvider>
  );
}

export default Room;

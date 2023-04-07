import { useContext } from "react";
import { RoomBoundariesContext } from "../contexts/RoomBoundariesContext";

export const useRoomBoundariesContext = () => {
  const context = useContext(RoomBoundariesContext);
  if (!context) {
    throw Error(
      "useRoomBoundariesContext must be used inside RoomBoundariesContextProvider"
    );
  }
  return context;
};

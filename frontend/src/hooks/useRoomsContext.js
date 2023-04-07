import { useContext } from "react";
import { RoomsContext } from "../contexts/RoomsContext";

export const useRoomsContext = () => {
  const context = useContext(RoomsContext);
  if (!context) {
    throw Error("useRoomsContext must be used inside RoomsContextProvider");
  }
  return context;
};

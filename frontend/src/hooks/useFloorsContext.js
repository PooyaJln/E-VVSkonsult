import { useContext } from "react";
import { FloorsContext } from "../contexts/FloorsContext";

export const useFloorsContext = () => {
  const context = useContext(FloorsContext);
  if (!context) {
    throw Error("useFloorsContext must be used inside FloorsContextProvider");
  }
  return context;
};

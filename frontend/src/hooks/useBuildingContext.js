import { useContext } from "react";
import { BuildingContext } from "../contexts/BuildingContext";

export const useBuildingContext = () => {
  const context = useContext(BuildingContext);
  if (!context) {
    throw Error(
      "useBuildingContext must be used inside BuildingContextProvider"
    );
  }
  return context;
};

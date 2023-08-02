import { BuildingsContext } from "../contexts/BuildingsContext";
import { useContext } from "react";

export const useBuildingsContext = () => {
  const context = useContext(BuildingsContext);
  if (!context) {
    throw Error(
      "useProjectsDataContext must be used inside ProjectsDataContextProvider"
    );
  }
  return context;
};

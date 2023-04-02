import { useContext } from "react";
import { ParametersContext } from "../contexts/ParametersContext";

export const useParametersContext = () => {
  const context = useContext(ParametersContext);
  if (!context) {
    throw Error(
      "useProjectsDataContext must be used inside ProjectsDataContextProvider"
    );
  }
  return context;
};

import { ProjectDataContext } from "../contexts/ProjectDataContext";
import { useContext } from "react";

export const useProjectDataContext = () => {
  const context = useContext(ProjectDataContext);
  if (!context) {
    throw Error(
      "useProjectDataContext must be used inside ProjectDataContextProvider"
    );
  }
  return context;
};

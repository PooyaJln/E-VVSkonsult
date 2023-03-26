import { ProjectsContext } from "../contexts/ProjectsContext";
import { useContext } from "react";

export const useProjectsContext = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw Error(
      "useProjectsDataContext must be used inside ProjectsDataContextProvider"
    );
  }
  return context;
};

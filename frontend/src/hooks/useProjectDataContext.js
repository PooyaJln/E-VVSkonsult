import { ProjectDataContext } from "../contexts/ProjectDataContext";
import { useContext } from "react";

export const useProjectDataContext = () => {
  const context = useContext(ProjectDataContext);
  if (!context) {
    throw Error(
      "useProjectsDataContext must be used inside ProjectsDataContextProvider"
    );
  }
  return context;
};

import { ProjectsContext } from "../contexts/ProjectsContext";
import { useContext } from "react";

export const useProjectsContext = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw Error(
      "useProjectsContext must be used inside ProjectsContextProvider"
    );
  }
  return context;
};

import { createContext, useReducer } from "react";

import { projectsReducer } from "../reducers/projectsReducer";

export const ProjectsContext = createContext();

export const ProjectsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectsReducer, {
    projects: null,
  });

  return (
    <ProjectsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProjectsContext.Provider>
  );
};

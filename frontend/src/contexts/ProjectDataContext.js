import { createContext, useReducer } from "react";

export const ProjectDataContext = createContext();

export const projectDataReducer = (state, action) => {
  switch (action.type) {
    case "GET_PROJECTS_DATA":
      return {
        project: action.payload,
      };
    case "CREATE_BUILDING":
      return {
        project: [action.payload.buildings, ...state.project], // since it's a new single work out and an array of pre-existing projects
      };

    default:
      return state;
  }
};

export const ProjectDataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectDataReducer, {
    project: null,
  });

  return (
    <ProjectDataContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProjectDataContext.Provider>
  );
};

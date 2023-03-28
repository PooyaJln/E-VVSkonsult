import { createContext, useReducer } from "react";

export const projectDataActionTypes = {
  GET_PROJECT: "GET_PROJECT",
};
export const buildingsActionTypes = {
  GET_BUILDING: "GET_BUILDING",
  CREATE_BUILDING: "CREATE_BUILDING",
  DELETE_BUILDING: "DELETE_BUILDING",
  UPDATE_BUILDING: "UPDATE_BUILDING",
};

export const thermalParametersActionTypes = {
  UPDATE_THERMALPARAMETER: "UPDATE_THERMALPARAMETER",
};

export const ProjectDataContext = createContext();

export const projectDataReducer = (state, action) => {
  switch (action.type) {
    case "GET_PROJECTS_DATA":
      return {
        project: action.payload,
      };
    case "GET_PROJECTS_DATA":
      return {
        project: action.payload,
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

import { createContext, useReducer } from "react";

export const projectDataInitialState = {
  // project: {
  //   project_id: "",
  //   project_name: "",
  //   buildings: [],
  //   thermalParameters: [],
  //   components: [],
  // },
  project: {},
};

export const projectDataActions = {
  GET_PROJECT_DATA: "GET_PROJECT_DATA",
};

export const projectDataReducer = (state, action) => {
  // const { type, payload } = action;
  switch (action.type) {
    case projectDataActions.GET_PROJECT_DATA:
      return {
        project: action.payload,
      };
    default:
      return state;
  }
};

export const ProjectDataContext = createContext();

export const ProjectDataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectDataReducer, {
    project: projectDataInitialState,
  });

  return (
    <ProjectDataContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProjectDataContext.Provider>
  );
};

import { createContext, useReducer } from "react";
import axios from "axios";

export const projectDataInitialState = {
  project_id: "",
  project_name: "",
  buildings: [],
  thermalParameters: [],
  components: [],
};

export const projectDataActions = {
  GET_PROJECT_DATA: "GET_PROJECT_DATA",
};

export const projectDataReducer = (state, action) => {
  // const { type, payload } = action;
  let _project;
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
  let projectsURI = "http://localhost:4001/heat-loss/projects/";

  const projectDataApiCalls = {};
  projectDataApiCalls.getProject = async (id) => {
    try {
      const response = await axios.get(projectsURI + `${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProjectDataContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProjectDataContext.Provider>
  );
};

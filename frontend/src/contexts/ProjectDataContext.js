import { createContext, useReducer } from "react";
import axios from "axios";

export const projectDataInitialState = {
  // project_id: "",
  // project_name: "",
  // buildings: [],
  // thermalParameters: [],
  // components: [],
  project: {},
  error: undefined,
  open: false,
  toggle: false,
};

export const projectDataActions = {
  GET_PROJECT_DATA: "GET_PROJECT_DATA",
  SET_BUILDINGS: "SET_BUILDINGS",
  CREATE_BUILDING: "CREATE_BUILDING",
  DELETE_BUILDING: "DELETE_BUILDING",
  UPDATE_BUILDING: "UPDATE_BUILDING",
  CREATE_COMPONENT: "CREATE_COMPONENT",
  DELETE_COMPONENT: "DELETE_COMPONENT",
  UPDATE_COMPONENT: "UPDATE_COMPONENT",
  UPDATE_PARAMETER: "UPDATE_PARAMETER",
  SET_ERROR: "SET_ERROR",
  SET_ERROR_UNDEFINED: "SET_ERROR_UNDEFINED",
  SET_TOGGLE: "SET_TOGGLE",
  SET_OPEN: "SET_OPEN",
};

export const projectDataReducer = (state, action) => {
  // const { type, payload } = action;
  let _project;
  switch (action.type) {
    case projectDataActions.GET_PROJECT_DATA:
      return {
        ...state,
        project: action.payload,
      };
    case projectDataActions.CREATE_BUILDING:
      console.log(
        "🚀 ~ file: ProjectDataContext.js:44 ~ projectDataReducer ~ payload:",
        action.payload
      );
      _project = { ...state.project };
      _project.buildings.push(action.payload);
      console.log(
        "🚀 ~ file: ProjectDataContext.js:44 ~ projectDataReducer ~ _project:",
        _project
      );
      return {
        ...state,
        project: _project,
      };
    case projectDataActions.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case projectDataActions.SET_ERROR_UNDEFINED:
      return {
        ...state,
        error: undefined,
      };
    case projectDataActions.SET_OPEN:
      return {
        ...state,
        open: action.payload,
      };
    case projectDataActions.SET_TOGGLE:
      return {
        ...state,
        toggle: action.payload,
      };
    default:
      return state;
  }
};

export const ProjectDataContext = createContext();

export const ProjectDataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectDataReducer, {
    state: projectDataInitialState,
  });
  let projectDataURI = "http://localhost:4001/heat-loss/projects/";
  let buildingsURI = "http://localhost:4001/heat-loss/buildings/";

  const projectDataDispatchCalls = {
    getProjectData: (payload) => {
      dispatch({ type: projectDataActions.GET_PROJECT_DATA, payload: payload });
    },
    createBuilding: (payload) => {
      dispatch({ type: projectDataActions.SET_BUILDINGS, payload: payload });
    },
  };

  const projectDataApiCalls = {
    getProjectData: async (id) => {
      try {
        const response = await axios.get(`${projectDataURI}${id}/data`);
        if (response.statusText === "OK") {
          projectDataDispatchCalls.getProjectData(response.data);
        }
      } catch (err) {
        const error = err.response.data.error;
        console.log(
          "file: ProjectDataContext.js:88 ~ getProjectData: ~ error:",
          error
        );
      }
    },
    createBuilding: async (data) => {
      try {
        const response = await axios.post(`${buildingsURI}/create`, data);
        if (response.statusText === "OK") {
          projectDataDispatchCalls.createBuilding(response.data);
        }
      } catch (err) {
        const error = err.response.data.error;
        console.log(
          "file: ProjectDataContext.js:112 ~ getProjectData: ~ error:",
          error
        );
      }
    },
  };

  return (
    <ProjectDataContext.Provider
      value={{ state, dispatch, projectDataApiCalls }}
    >
      {children}
    </ProjectDataContext.Provider>
  );
};

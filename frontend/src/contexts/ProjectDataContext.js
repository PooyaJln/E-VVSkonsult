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
  UPDATE_PARAMETER: "UPDATE_PARAMETER",
  CREATE_COMPONENT: "CREATE_COMPONENT",
  DELETE_COMPONENT: "DELETE_COMPONENT",
  UPDATE_COMPONENT: "UPDATE_COMPONENT",
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
    case projectDataActions.UPDATE_PROJECT:
      console.log(action.payload);
      _project = state.project;
      console.log(
        "🚀 ~ file: ProjectDataContext.js:40 ~ projectDataReducer ~ _project:",
        _project
      );
      let thermalParameters = _project.thermalParameters.map((parameter) => {
        return parameter.parameter_id === action.payload.parameter_id
          ? action.payload
          : parameter;
      });
      _project.thermalParameters = thermalParameters;
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
  let thermalParametersURI =
    "http://localhost:4001/heat-loss/thermal-parameters/";

  const projectDataDispatchCalls = {
    getProjectData: (payload) => {
      dispatch({ type: projectDataActions.GET_PROJECT_DATA, payload: payload });
    },
    updateParameter: (payload) => {
      dispatch({ type: projectDataActions.UPDATE_PARAMETER, payload: payload });
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
    updateParameter: async (id, data) => {
      const response = await axios.patch(`${thermalParametersURI}${id}`, data);
      if (response.statusText === "OK") {
        projectDataDispatchCalls.getProjectData(response.data);
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

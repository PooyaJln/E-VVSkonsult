import { createContext, useMemo, useReducer } from "react";
import axios from "axios";

export const projectsInitialState = {
  projects: [],
  error: undefined,
  open: false,
  toggle: false,
  updateToggle: false,
};

export const projectActionTypes = {
  GET_PROJECTS: "GET_PROJECTS",
  CREATE_PROJECT: "CREATE_PROJECT",
  DELETE_PROJECT: "DELETE_PROJECT",
  UPDATE_PROJECT: "UPDATE_PROJECT",
  SET_ERROR: "SET_ERROR",
  SET_ERROR_UNDEFINED: "SET_ERROR_UNDEFINED",
  SET_TOGGLE: "SET_TOGGLE",
  SET_OPEN: "SET_OPEN",
  SET_UPDATE_TOGGLE: "SET_UPDATE_TOGGLE",
};

export const projectsReducer = (state, action) => {
  // const { type, payload } = action;
  let _projects = [];
  switch (action.type) {
    case projectActionTypes.GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    case projectActionTypes.CREATE_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case projectActionTypes.DELETE_PROJECT:
      _projects = state.projects;
      return {
        ...state,
        projects: _projects.filter(
          (project) => project.project_id !== action.payload.project_id
        ),
      };
    case projectActionTypes.UPDATE_PROJECT:
      _projects = state.projects;
      let project = _projects.find(
        (project) => project.project_id === action.payload.project_id
      );
      Object.assign(project, action.payload);
      return {
        projects: _projects,
      };
    case projectActionTypes.SET_ERROR:
      console.log("reducer error", action);
      return {
        ...state,
        error: action.payload,
      };
    case projectActionTypes.SET_OPEN:
      return {
        ...state,
        open: action.payload,
      };
    case projectActionTypes.SET_OPEN_FALSE:
      return {
        ...state,
        open: action.payload,
      };
    case projectActionTypes.SET_OPEN_TRUE:
      return {
        ...state,
        open: action.payload,
      };
    case projectActionTypes.SET_TOGGLE:
      return {
        ...state,
        toggle: action.payload,
      };
    case projectActionTypes.SET_UPDATE_TOGGLE:
      return {
        ...state,
        updateToggle: action.payload,
      };

    default:
      return state;
  }
};
export const ProjectsContext = createContext();

export const ProjectsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectsReducer, {
    projects: projectsInitialState.projects,
  });

  let projectsURI = "http://localhost:4001/heat-loss/projects/";

  const apiCalls = {};
  apiCalls.getProjects = async () => {
    try {
      const response = await axios.get(projectsURI + "all");
      if (response.statusText === "OK") {
        dispatchCalls.getProjects(response.data);
      }
    } catch (err) {
      const error = err.response.data.error;
      dispatchCalls.setError(error);
      dispatchCalls.setOpen(true);
    }
  };
  apiCalls.deleteProject = async (id) => {
    try {
      const response = await axios.delete(projectsURI + `${id}`);
      if (response.statusText === "OK") {
        dispatchCalls.deleteProject(response.data);
      }
    } catch (err) {
      const error = err.response.data.error;
      dispatchCalls.setError(error);
      dispatchCalls.setOpen(true);
    }
  };
  apiCalls.updateProject = async (id, data) => {
    try {
      let response = await axios.patch(projectsURI + `${id}`, data);
      if (response.statusText === "OK") {
        dispatchCalls.updateProject(response.data);
      }
    } catch (err) {
      const error = err.response.data.error;
      dispatchCalls.setError(error);
      dispatchCalls.setOpen(true);
    }
  };
  apiCalls.createProject = async (data) => {
    let response;
    try {
      response = await axios.post(projectsURI + "create", data);
      dispatchCalls.createProject(response.data);
    } catch (err) {
      const error = err.response.data.error;
      dispatchCalls.setError(error);
      dispatchCalls.setOpen(true);
    }
  };

  const uiCalls = {
    setOpen: (value) => {
      dispatchCalls.setOpen(value);
    },
    setToggle: (value) => {
      dispatchCalls.setToggle(value);
    },
    setUpdateToggle: (value) => {
      dispatchCalls.setUpdateToggle(value);
    },
  };

  const dispatchCalls = {
    getProjects: (payload) => {
      dispatch({ type: projectActionTypes.GET_PROJECTS, payload: payload });
    },
    createProject: (payload) => {
      dispatch({ type: projectActionTypes.CREATE_PROJECT, payload: payload });
    },
    deleteProject: (payload) => {
      dispatch({ type: projectActionTypes.DELETE_PROJECT, payload: payload });
    },
    updateProject: (payload) => {
      dispatch({ type: projectActionTypes.UPDATE_PROJECT, payload: payload });
    },
    setError: (payload) => {
      dispatch({ type: projectActionTypes.SET_ERROR, payload: payload });
    },
    setOpen: (payload) => {
      dispatch({ type: projectActionTypes.SET_OPEN, payload: payload });
    },
    setToggle: (payload) => {
      dispatch({ type: projectActionTypes.SET_TOGGLE, payload: payload });
    },
  };

  return (
    // <ProjectsContext.Provider value={{ ...state, dispatch }}>
    <ProjectsContext.Provider
      value={{
        state,
        dispatch,
        apiCalls,
        dispatchCalls,
        uiCalls,
      }}
    >
      {children}
    </ProjectsContext.Provider>
    // <ProjectsContext.Provider value={{ ...state, dispatch }} {...children} />
    // <ProjectsContext.Provider value={value} {...children} />
  );
};

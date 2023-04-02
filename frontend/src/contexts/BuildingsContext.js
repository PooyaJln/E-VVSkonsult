import axios from "axios";
import { createContext, useReducer } from "react";

export const buildingsInitialState = {
  buildings: [],
  error: undefined,
  open: false,
  toggle: false,
};

export const buildingsActionTypes = {
  GET_BUILDINGS: "GET_BUILDINGS",
  CREATE_BUILDING: "CREATE_BUILDING",
  DELETE_BUILDING: "DELETE_BUILDING",
  UPDATE_BUILDING: "UPDATE_BUILDING",
  SET_ERROR: "SET_ERROR",
  SET_ERROR_UNDEFINED: "SET_ERROR_UNDEFINED",
  SET_TOGGLE: "SET_TOGGLE",
  SET_OPEN: "SET_OPEN",
  SET_CREATE_TOGGLE: "SET_CREATE_TOGGLE",
};

export const buildingsReducer = (state, action) => {
  // const { type, payload } = action;
  let _buildings = [];
  switch (action.type) {
    case buildingsActionTypes.GET_BUILDINGS:
      console.log(action.payload);
      return {
        ...state,
        buildings: action.payload,
      };
    case buildingsActionTypes.CREATE_BUILDING:
      return {
        ...state,
        buildings: [...state.buildings, action.payload],
      };
    case buildingsActionTypes.DELETE_BUILDING:
      _buildings = state.buildings;
      return {
        ...state,
        buildings: _buildings.filter(
          (building) => building.building_id !== action.payload.building_id
        ),
      };
    case buildingsActionTypes.UPDATE_BUILDING:
      _buildings = state.buildings.map((building) => {
        return building.building_id === action.payload.building_id
          ? action.payload
          : building;
      });
      return {
        buildings: _buildings,
      };
    case buildingsActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case buildingsActionTypes.SET_ERROR_UNDEFINED:
      return {
        ...state,
        error: undefined,
      };
    case buildingsActionTypes.SET_OPEN:
      return {
        ...state,
        open: action.payload,
      };
    case buildingsActionTypes.SET_TOGGLE:
      return {
        ...state,
        toggle: action.payload,
      };
    case buildingsActionTypes.SET_CREATE_TOGGLE:
      return {
        ...state,
        createToggle: action.payload,
      };
    default:
      return state;
  }
};
export const BuildingsContext = createContext();

export const BuildingsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(buildingsReducer, {
    buildings: buildingsInitialState.buildings,
  });

  let buildingsURI = "http://localhost:4001/heat-loss/buildings/";

  const dispatchCalls = {
    getBuildings: (payload) => {
      dispatch({ type: buildingsActionTypes.GET_BUILDINGS, payload: payload });
    },
    createBuilding: (payload) => {
      dispatch({
        type: buildingsActionTypes.CREATE_BUILDING,
        payload: payload,
      });
    },
    deleteBuilding: (payload) => {
      dispatch({
        type: buildingsActionTypes.DELETE_BUILDING,
        payload: payload,
      });
    },
    updateBuilding: (payload) => {
      dispatch({
        type: buildingsActionTypes.UPDATE_BUILDING,
        payload: payload,
      });
    },
    setError: (payload) => {
      dispatch({ type: buildingsActionTypes.SET_ERROR, payload: payload });
    },
    setErrorUndef: () => {
      dispatch({
        type: buildingsActionTypes.SET_ERROR_UNDEFINED,
      });
    },
    setOpen: (payload) => {
      dispatch({ type: buildingsActionTypes.SET_OPEN, payload: payload });
    },
    setToggle: (payload) => {
      dispatch({ type: buildingsActionTypes.SET_TOGGLE, payload: payload });
    },
    setCreateToggle: (payload) => {
      dispatch({
        type: buildingsActionTypes.SET_CREATE_TOGGLE,
        payload: payload,
      });
    },
  };

  const apiCalls = {};
  apiCalls.getBuildings = async (id) => {
    try {
      const project_id = id;
      const response = await axios.get(`${buildingsURI}${project_id}/all`);
      if (response.statusText === "OK") {
        dispatchCalls.getBuildings(response.data.buildings);
      }
    } catch (err) {
      const error = err.response.data.error;
      console.log(
        "file: ProjectsContext.js:133 ~ apiCalls.getProjects= ~ error:",
        error
      );
    }
  };
  apiCalls.createBuilding = async (data) => {
    let response;
    try {
      response = await axios.post(buildingsURI + "create", data);
      dispatchCalls.createBuilding(response.data);
      dispatchCalls.setErrorUndef();
      dispatchCalls.setCreateToggle(false);
    } catch (err) {
      const error = err.response.data.error;
      dispatchCalls.setError(error);
      dispatchCalls.setOpen(true);
      dispatchCalls.setCreateToggle(true);
    }
  };
  apiCalls.deleteBuilding = async (id) => {
    try {
      const response = await axios.delete(buildingsURI + `${id}`);
      if (response.statusText === "OK") {
        dispatchCalls.deleteBuilding(response.data);
      }
    } catch (err) {
      const error = err.response.data.error;
      dispatchCalls.setError(error);
      dispatchCalls.setOpen(true);
    }
  };
  apiCalls.updateBuilding = async (id, data) => {
    try {
      let buildingsNamesList = [];
      state.buildings.map((building) =>
        buildingsNamesList.push(building.building_name)
      );
      if (buildingsNamesList.includes(data.building_name)) {
        dispatchCalls.setError("This name already exists!!!");
        uiCalls.setOpen(true);
      } else {
        let response = await axios.patch(buildingsURI + `${id}`, data);
        if (response.statusText === "OK") {
          dispatchCalls.updateBuilding(response.data);
          dispatchCalls.setErrorUndef();
        }
      }
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
    setCreateToggle: (value) => {
      dispatchCalls.setCreateToggle(value);
    },
    setError: (value) => {
      dispatchCalls.setError(value);
    },
    setErrorUndef: () => {
      dispatchCalls.setErrorUndef();
    },
  };

  return (
    <BuildingsContext.Provider value={{ state, dispatch, uiCalls, apiCalls }}>
      {children}
    </BuildingsContext.Provider>
  );
};

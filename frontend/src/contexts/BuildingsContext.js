import { createContext, useReducer } from "react";

export const buildingsInitialState = {
  buildings: [],
};

export const buildingsActionTypes = {
  GET_BUILDINGS: "GET_BUILDINGS",
  CREATE_BUILDING: "CREATE_BUILDING",
  DELETE_BUILDING: "DELETE_BUILDING",
  UPDATE_BUILDING: "UPDATE_BUILDING",
};

export const buildingsReducer = (state, action) => {
  // const { type, payload } = action;
  switch (action.type) {
    case buildingsActionTypes.GET_BUILDINGS:
      return {
        buildings: action.payload,
      };
    case buildingsActionTypes.createContext:
      return {
        buildings: [...state.buildings, action.payload],
      };
    case buildingsActionTypes.DELETE_BUILDING:
      return {
        buildings: state.buildings.filter(
          (building) => building.building_id !== action.payload.building_id
        ),
      };
    case buildingsActionTypes.UPDATE_BUILDING:
      let building = state.buildings.find(
        (building) => building.building_id === action.payload.building_id
      );
      Object.assign(building, action.payload);
      return {
        buildings: state.buildings,
      };
    default:
      return state;
  }
};
export const BuildingsContext = createContext();

export const BuildingsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(buildingsReducer, {
    buildings: buildingsInitialState,
  });

  return (
    <BuildingsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BuildingsContext.Provider>
  );
};

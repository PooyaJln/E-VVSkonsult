import { createContext, useReducer } from "react";
import { BuildingReducer } from "../reducers/BuildingReducer";

export const BuildingContext = createContext();

export const BuildingContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BuildingReducer, {
    buildings: null,
  });

  return (
    <BuildingContextProvider.Provider value={{ ...state, dispatch }}>
      {children}
    </BuildingContextProvider.Provider>
  );
};

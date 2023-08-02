import { useContext } from "react";
import { ComponentsContext } from "../contexts/ComponentsContext";

export const useComponentsContext = () => {
  const context = useContext(ComponentsContext);
  if (!context) {
    throw Error(
      "useComponentsDataContext must be used inside ComponentsDataContextProvider"
    );
  }
  return context;
};

import { useContext } from "react";
import { TemperaturesContext } from "../contexts/TemperaturesContext";

export const useTemperaturesContext = () => {
  const context = useContext(TemperaturesContext);
  if (!context) {
    throw Error(
      "useTemperaturesDataContext must be used inside TemperaturesDataContextProvider"
    );
  }
  return context;
};

import { useContext } from "react";
import { ApartmentsContext } from "../contexts/ApartmentsContext";

export const useApartmentsContext = () => {
  const context = useContext(ApartmentsContext);
  if (!context) {
    throw Error(
      "useApartmentsContext must be used inside ApartmentsContextProvider"
    );
  }
  return context;
};

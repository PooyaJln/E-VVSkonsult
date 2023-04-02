import ItemsList from "./ItemsList";
import { ParametersContextProvider } from "../../contexts/ParametersContext";

const ThermalParameters = () => {
  return (
    <ParametersContextProvider>
      <div className="thermalparameter">
        <ItemsList />
      </div>
    </ParametersContextProvider>
  );
};

export default ThermalParameters;

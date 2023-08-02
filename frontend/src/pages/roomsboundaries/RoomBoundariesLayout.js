import { Outlet } from "react-router-dom";
import { RoomsContextProvider } from "../../contexts/RoomsContext";

const RoomsLayout = () => {
  return (
    <RoomsContextProvider>
      <Outlet />
    </RoomsContextProvider>
  );
};

export default RoomsLayout;

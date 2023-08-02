import { Outlet } from "react-router-dom";
import { ApartmentsContextProvider } from "../../contexts/ApartmentsContext";

const ApartmentsLayout = () => {
  return (
    <ApartmentsContextProvider>
      <Outlet />
    </ApartmentsContextProvider>
  );
};

export default ApartmentsLayout;

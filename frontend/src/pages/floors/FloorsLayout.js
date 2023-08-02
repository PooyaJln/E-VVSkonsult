import { Outlet } from "react-router-dom";
import { FloorsContextProvider } from "../../contexts/FloorsContext";

const FloorsLayout = () => {
  return (
    <FloorsContextProvider>
      <Outlet />
    </FloorsContextProvider>
  );
};

export default FloorsLayout;

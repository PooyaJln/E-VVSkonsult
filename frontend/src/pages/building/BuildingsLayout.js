import { Outlet, useOutletContext } from "react-router-dom";
import { BuildingsContextProvider } from "../../contexts/BuildingsContext";

const BuildingsLayout = () => {
  // const project = useOutletContext();
  // return <Outlet context={project} />;

  return (
    <BuildingsContextProvider>
      <Outlet />
    </BuildingsContextProvider>
  );
};

export default BuildingsLayout;

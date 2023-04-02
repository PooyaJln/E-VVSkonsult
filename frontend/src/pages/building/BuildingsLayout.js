import { Outlet, useOutletContext } from "react-router-dom";

const BuildingsLayout = () => {
  const project = useOutletContext();
  return <Outlet context={project} />;
};

export default BuildingsLayout;

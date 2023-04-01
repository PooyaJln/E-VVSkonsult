import React, { useEffect } from "react";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { useProjectDataContext } from "../../hooks/useProjectDataContext";

const BuildingsLayout = () => {
  const project = useOutletContext();
  return <Outlet context={project} />;
  // return <Outlet />;
};

export default BuildingsLayout;

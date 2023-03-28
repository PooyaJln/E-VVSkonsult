import React, { useEffect } from "react";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { useProjectDataContext } from "../../hooks/useProjectDataContext";

const FloorsLayout = () => {
  const building = useOutletContext();
  return <Outlet context={building} />;
};

export default FloorsLayout;

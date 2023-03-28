import React, { useEffect } from "react";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { useProjectDataContext } from "../../hooks/useProjectDataContext";

const RoomsLayout = () => {
  return <Outlet />;
};

export default RoomsLayout;

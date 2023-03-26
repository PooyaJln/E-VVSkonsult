import React from "react";
import { Outlet } from "react-router-dom";
import { ProjectDataContextProvider } from "../../contexts/ProjectDataContext";

function ProjectsLayout() {
  return (
    <ProjectDataContextProvider>
      <Outlet />
    </ProjectDataContextProvider>
  );
}

export default ProjectsLayout;

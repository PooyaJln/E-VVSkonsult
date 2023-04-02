import { Outlet } from "react-router-dom";
import { ProjectDataContextProvider } from "../../contexts/ProjectDataContext";
import { BuildingsContextProvider } from "../../contexts/BuildingsContext";

function ProjectsLayout() {
  return (
    <ProjectDataContextProvider>
      <BuildingsContextProvider>
        <Outlet />
      </BuildingsContextProvider>
    </ProjectDataContextProvider>
  );
}

export default ProjectsLayout;

//https://youtu.be/T8ZhepmbP4s?list=PL4cUxeGkcC9iVKmtNuCeIswnQ97in2GGf&t=256

import { Outlet, useParams } from "react-router-dom";
import ProjectNavBar from "../../layouts/ProjectNavBar";
import { useProjectDataContext } from "../../hooks/useProjectDataContext";
import { useEffect } from "react";

const Project = () => {
  const project_id = useParams().project_id;
  const { state, projectDataApiCalls } = useProjectDataContext();
  const project = state?.project || {};

  useEffect(() => {
    projectDataApiCalls.getProjectData(project_id);
  }, []);

  return (
    <>
      <h2>Project: {project && project.project_name}: </h2>
      <ProjectNavBar />

      <Outlet context={project} />
    </>
  );
};

export default Project;

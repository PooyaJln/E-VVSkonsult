//https://youtu.be/T8ZhepmbP4s?list=PL4cUxeGkcC9iVKmtNuCeIswnQ97in2GGf&t=256

import { Outlet, useParams } from "react-router-dom";
import ProjectNavBar from "../../layouts/ProjectNavBar";
import { projectDataActions } from "../../contexts/ProjectDataContext";
import { useProjectDataContext } from "../../hooks/useProjectDataContext";
import { useEffect } from "react";

const Project = () => {
  const project_id = useParams().project_id;
  const { project, dispatch } = useProjectDataContext();

  useEffect(() => {
    let projectDataURI =
      "http://localhost:4001/heat-loss/projects/" + project_id + "/data";
    const fetchProjectData = async () => {
      const response = await fetch(projectDataURI);
      const responseJson = await response.json();

      if (response.ok) {
        dispatch({
          type: projectDataActions.GET_PROJECT_DATA,
          payload: responseJson,
        });
      }
    };

    fetchProjectData();
  }, [project_id, dispatch]);

  return (
    <>
      <h2>Project: {project && project.project_name}: </h2>
      <ProjectNavBar />

      <Outlet context={project} />
    </>
  );
};

export default Project;

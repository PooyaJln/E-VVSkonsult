import { Outlet, useLoaderData } from "react-router-dom";
import ProjectNavBar from "../../layouts/ProjectNavBar";

//https://youtu.be/T8ZhepmbP4s?list=PL4cUxeGkcC9iVKmtNuCeIswnQ97in2GGf&t=256
const Project = () => {
  const project = useLoaderData();
  // const project_id = useParams().project_id || project?.project_id;

  return (
    <>
      <h2>Project: {project && project.project_name}: </h2>
      <ProjectNavBar />

      <Outlet context={project} />
    </>
  );
};

export default Project;

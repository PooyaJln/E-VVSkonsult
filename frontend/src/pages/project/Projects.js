import { useEffect, useState } from "react";

import CreateProject from "./CreateProject";
import ProjectComponent from "./ProjectComponent";

const Projects = () => {
  const [projects, setProjects] = useState(null);

  const projectList = async () => {
    let allProjectsURI = "http://localhost:4001/heat-loss/projects/all";
    const fetchProjects = async () => {
      const response = await fetch(allProjectsURI);
      const responseJson = await response.json();
      if (response.ok) {
        setProjects(responseJson);
      }
    };

    fetchProjects();
  };

  useEffect(() => {
    projectList();
  }, []);

  return (
    <div className="projects">
      <table className="projects-table">
        <tr className="projects-table-headers">
          <th>Project name</th>
          <th></th>
        </tr>
        <CreateProject projectList={projectList} />
        {projects &&
          projects.map((item, index) => (
            <ProjectComponent
              key={index}
              item={item}
              projectList={projectList}
            />
          ))}
      </table>
    </div>
  );
};

export default Projects;

const singleProjectLoader = async ({ params }) => {
  const { project_id } = params;
  let projectURI = `http://localhost:4001/heat-loss/projects/${project_id}/data`;
  const response = await fetch(projectURI);
  return response.json();
};

export default singleProjectLoader;

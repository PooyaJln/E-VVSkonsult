const buildingsLoader = async ({ params }) => {
  const { project_id } = params;
  let allBuildingsURI = `http://localhost:4001/heat-loss/projects/${project_id}/data`;
  const response = await fetch(allBuildingsURI);
  return response.json();
};

export default buildingsLoader;

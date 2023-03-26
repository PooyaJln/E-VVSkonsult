const materialsLoader = async ({ params }) => {
  const { project_id } = params;
  let allMaterialsURI = `http://localhost:4001/heat-loss/projects/${project_id}/data`;
  const response = await fetch(allMaterialsURI);
  return response.json();
};

export default materialsLoader;

const singleBuildingLoader = async ({ params }) => {
  const { building_id } = params;
  let allProjectsURI = `http://localhost:4001/heat-loss/buildings/${building_id}`;
  const response = await fetch(allProjectsURI);
  return response.json();
};

export default singleBuildingLoader;

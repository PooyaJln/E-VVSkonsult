const allProjectsLoader = async () => {
  let allProjectsURI = "http://localhost:4001/heat-loss/projects/all";

  const response = await fetch(allProjectsURI);
  return response.json();
};

export default allProjectsLoader;

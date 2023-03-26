import { redirect } from "react-router-dom";

const ProjectCreateAction = async ({ request }) => {
  let data = {};

  const createProjectURI = "http://localhost:4001/heat-loss/projects/create";
  // console.log(request);
  const formData = await request.formData();
  const newItem = {
    project_name: formData.get("project_name"),
    owner_id: 8,
  };
  // console.log(newItem);

  const response = await fetch(createProjectURI, {
    method: "POST",
    body: JSON.stringify(newItem),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseToJson = await response.json();
  if (!response.ok) {
    const error = responseToJson.error;
    console.log(error);
    data.error = error;
    return data;
  }

  if (response.ok) {
    console.log("new project added");
    return redirect("/heat-loss/projects");
  }

  // return null;
};

export default ProjectCreateAction;

import { useEffect } from "react";
import { useLoaderData, useOutletContext, useParams } from "react-router-dom";
import { useProjectDataContext } from "../../hooks/useProjectDataContext";

import ItemComponent from "./ItemComponent";

const ItemsList = () => {
  // const project = useLoaderData();
  const project = useOutletContext();
  const { project_id } = useParams();
  let { dispatch } = useProjectDataContext();
  // useEffect(() => {
  //   let projectURI = `http://localhost:4001/heat-loss/projects/${project_id}/data`;
  //   const fetchProject = async () => {
  //     const response = await fetch(projectURI);
  //     const responseJson = await response.json();
  //     if (response.ok) {
  //       dispatch({ type: "GET_PROJECTS_DATA", payload: responseJson });
  //     }
  //   };

  //   fetchProject();
  // }, [dispatch, project_id]);
  const newThermalParameters = project.thermalParameters;

  const initialThermalParameters = [
    {
      parameter_name: "Specific infiltration flow",
      parameter_value: "",
      parameter_unit: (
        <span>
          l/s.m<sup>2</sup>
        </span>
      ),
    },
    {
      parameter_name: "thermal bridge coeff",
      parameter_value: "",
      parameter_unit: null,
    },
    {
      parameter_name: "air density",
      parameter_value: "",
      parameter_unit: (
        <span>
          kg.m<sup>3</sup>
        </span>
      ),
    },
    {
      parameter_name: "specific heat capacity",
      parameter_value: "",
      parameter_unit: "J/kg.C",
    },
  ];

  initialThermalParameters.forEach((item) => {
    newThermalParameters.forEach((_item) => {
      if (item.parameter_name == _item.parameter_name) {
        item["parameter_value"] = _item.parameter_value;
        item["parameter_id"] = _item.parameter_id;
      }
    });
  });

  return (
    <div className="items">
      <table className="items-table">
        <tbody>
          <tr className="items-table-headers" key={1}>
            <th>Paramter name</th>
            <th>Value</th>
            <th>Unit</th>
          </tr>
          {initialThermalParameters &&
            initialThermalParameters.map((thermalParameter, index) => (
              <ItemComponent
                key={index + 2}
                thermalParameter={thermalParameter}
                project={project}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemsList;

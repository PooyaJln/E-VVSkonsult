import { useEffect, useRef, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

import CreateBuilding from "./CreateBuilding";
import BuildingsTableRow from "./BuildingsTableRow";
import ErrorDialog from "../../components/ErrorDialog";
import { useBuildingsContext } from "../../hooks/useBuildingsContext";
import { buildingsActionTypes } from "../../contexts/BuildingsContext";

const ItemsList = () => {
  const project = useOutletContext();
  // const { buildings, dispatch } = useBuildingsContext();

  // const project_id = useParams().project_id || project.project_id;
  const project_id = useParams().project_id;
  const [buildings, setBuildings] = useState(project?.buildings || []);

  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  // const buildingsList = async () => {
  //   let projectsDataURI =
  //     "http://localhost:4001/heat-loss/projects/" + project_id + "/data";
  //   const fetchProject = async () => {
  //     const response = await fetch(projectsDataURI);
  //     const responseJson = await response.json();
  //     if (response.ok) {
  //       setBuildings(responseJson.buildings);
  //     }
  //   };

  //   fetchProject();
  // };
  // useEffect(() => {
  //   let allBuildingsURI =
  //     "http://localhost:4001/heat-loss/buildings/" + project_id + "/all";
  //   const fetchProjects = async () => {
  //     const response = await fetch(allBuildingsURI);
  //     const responseJson = await response.json();
  //     console.log(
  //       "🚀 ~ file: ItemsList.js:24 ~ fetchProjects ~ responseJson:",
  //       responseJson
  //     );

  //     if (response.ok) {
  //       dispatch({
  //         type: buildingsActionTypes.GET_BUILDINGS,
  //         payload: responseJson.buildings,
  //       });
  //     }
  //   };

  //   fetchProjects();
  // }, [project_id, dispatch]);

  const setParentToggle = (value) => {
    setToggle(value);
  };

  const setParentError = (value) => {
    setError(value);
    setOpen(true);
  };

  const setParentOpen = () => {
    setOpen(false);
  };

  useEffect(() => {
    setBuildings(project?.buildings);
    // }, [project?.buildings]);
  }, [project]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const newItem = {
  //     building_name: itemName,
  //     project_id: project_id,
  //   };

  //   const createItemURI = "http://localhost:4001/heat-loss/buildings/create";

  //   const response = await fetch(createItemURI, {
  //     method: "POST",
  //     body: JSON.stringify(newItem),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   const responseToJson = await response.json();
  //   if (!response.ok) {
  //     setError(responseToJson.error);
  //     console.log(error);
  //   }
  //   if (response.ok) {
  //     setBuildings([...buildings, responseToJson]);
  //     setError(null);
  //     setItemName("");
  //     setToggle(false);
  //   }
  // };

  // useEffect(() => {
  //   buildingsList();
  // }, []);

  // const handleCreatePlusButtonClick = () => {
  //   setToggle(true);
  //   setTimeout(() => {
  //     createComponentInputRef.current.focus();
  //     createComponentInputRef.current.scrollIntoView();
  //   }, 0);
  // };

  return (
    <>
      {/* {error && <ErrorDialog error={error} setError={setError} />} */}
      {error && (
        <ErrorDialog error={error} open={open} setParentOpen={setParentOpen} />
      )}

      <div className="items">
        <div>
          <button
            // onClick={handleCreatePlusButtonClick}
            onClick={() => setToggle(true)}
          >
            <span className="material-symbols-outlined">add</span>
          </button>
          <span>add a building</span>
        </div>
        <table className="items-table">
          <tbody>
            <tr className="items-table-headers" key={1}>
              <th>Building name</th>
              <th></th>
            </tr>
            {toggle ? (
              <>
                <CreateBuilding
                  // toggle={toggle}
                  setParentToggle={setParentToggle}
                  setParentError={setParentError}
                  // open={open}
                  setParentOpen={setParentOpen}
                  buildings={buildings}
                  // setBuildings={setBuildings}
                  // buildingsList={buildingsList}
                  // ref={createComponentInputRef}
                />
              </>
            ) : null}
            {buildings &&
              buildings.map((building, index) => (
                <BuildingsTableRow
                  key={index + 2}
                  building={building}
                  buildings={buildings}
                  // setBuildings={setBuildings}
                  setParentError={setParentError}
                  open={open}
                  setParentOpen={setParentOpen}
                  // project={project}
                  // buildingsList={buildingsList}
                />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ItemsList;

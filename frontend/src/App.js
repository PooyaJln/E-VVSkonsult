import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Help from "./pages/Help";
import Projects from "./pages/project/Projects";
import Buildings from "./pages/building/ItemsList";
import Materials from "./pages/material/Materials";
import Building from "./pages/building/Building";
import ThermalParameters from "./pages/thermalParameter/thermalParameters";
import Project from "./pages/project/Project";
import ProjectResults from "./pages/project/ProjectResults";
import BuildingResults from "./pages/building/BuildingResults";
import Floors from "./pages/floors/Floors";

// layouts
import RootLayout from "./layouts/RootLayout";
import HeatLossLayout from "./layouts/HeatLossLayout";
import ProjectsLayout from "./pages/project/ProjectsLayout";
import BuildingsLayout from "./pages/building/BuildingsLayout";
import FloorsLayout from "./pages/floors/FloorsLayout";

//Loaders
import allProjectsLoader from "./pages/project/loaders/allProjectsLoader";
import singleProjectLoader from "./pages/project/loaders/singleProjectLoader";
import buildingsLoader from "./pages/building/loaders/buildingsLoader";
import materialsLoader from "./pages/material/loaders/materialsLoader";
import singleBuildingLoader from "./pages/building/loaders/singleBuildingLoader";
import ProjectCreateAction from "./pages/project/actions/projectCreateAction";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="heat-loss" element={<HeatLossLayout />}>
        <Route path="help" element={<Help />} />
        <Route
          path="projects"
          element={<ProjectsLayout />}
          // action={ProjectCreateAction}
        >
          <Route
            index
            element={<Projects />}
            // loader={allProjectsLoader}
          />
          <Route
            path=":project_id"
            // loader={singleProjectLoader}
            element={<Project />}
          >
            <Route
              path="thermalParameters"
              element={<ThermalParameters />}
              // loader={singleProjectLoader}
            />
            <Route
              path="materials"
              element={<Materials />}
              // loader={materialsLoader}
            />
            <Route path="results" element={<ProjectResults />} />
            <Route path="buildings" element={<BuildingsLayout />}>
              <Route path="" element={<Buildings />} />
              <Route
                path=":building_id"
                element={<Building />}
                // loader={singleBuildingLoader}
              >
                <Route path="floors" element={<FloorsLayout />}>
                  <Route index element={<Floors />} />
                </Route>
                <Route path="results" element={<BuildingResults />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

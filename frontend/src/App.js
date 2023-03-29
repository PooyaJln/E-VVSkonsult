import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// layouts
import RootLayout from "./layouts/RootLayout";
import HeatLossLayout from "./layouts/HeatLossLayout";
import ProjectsLayout from "./pages/project/ProjectsLayout";
import BuildingsLayout from "./pages/building/BuildingsLayout";
import FloorsLayout from "./pages/floor/FloorsLayout";

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Help from "./pages/Help";
import Projects from "./pages/project/Projects";
import Buildings from "./pages/building/ItemsList";
import Materials from "./pages/material/Materials";
import Project from "./pages/project/Project";
import Building from "./pages/building/Building";
import ThermalParameters from "./pages/thermalParameter/thermalParameters";
import Floors from "./pages/floor/Floors";
import Floor from "./pages/floor/Floor";
import ProjectResults from "./pages/project/ProjectResults";
import BuildingResults from "./pages/building/BuildingResults";
import FloorResults from "./pages/floor/FloorResults";

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
        <Route path="projects" element={<ProjectsLayout />}>
          {/* <Route index element={<Projects />} loader={allProjectsLoader} /> */}
          <Route index element={<Projects />} />
          {/* <Route path=":project_id" loader={singleProjectLoader} element={<Project />}> */}
          {/* <Route path=":project_id" element={<Project />}> */}
          {/* <Route path="thermalParameters" element={<ThermalParameters />} /> */}
          {/* <Route path="materials" element={<Materials />} /> */}
          {/* <Route path="results" element={<ProjectResults />} /> */}
          {/* <Route path="buildings" element={<BuildingsLayout />}> */}
          {/* <Route index element={<Buildings />} /> */}
          {/* <Route path=":building_id" element={<Building />} loader={singleBuildingLoader} > */}
          {/* <Route path=":building_id" element={<Building />}>
                <Route path="results" element={<BuildingResults />} />
                <Route path="floors" element={<FloorsLayout />}>
                  <Route path="results" element={<FloorResults />} />
                  <Route index element={<Floors />}>
                    <Route path=":floor_id" element={<Floor />}></Route>
                  </Route>
                </Route>
              </Route> */}
          {/* </Route> */}
          {/* </Route> */}
        </Route>
      </Route>
    </Route>
  )
);

// const router2 = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       {
//         path: "about",
//         element: <About />,
//       },
//       {
//         path: "heat-loss",
//         element: <HeatLossLayout />,
//         children: [
//           {
//             path: "help",
//             element: <Help />,
//           },
//           {
//             path: "projects",
//             element: <ProjectsLayout />,
//             children: [
//               {
//                 index: true,
//                 element: <Projects />,
//               },
//               {
//                 path: ":project_id",
//                 element: <Project />,
//                 children: [
//                   {
//                     path: "thermalParameters",
//                     element: <ThermalParameters />,
//                   },
//                   {
//                     path: "materials",
//                     element: <Materials />,
//                   },
//                   {
//                     path: "results",
//                     element: <ProjectResults />,
//                   },
//                   {
//                     path: "buildings",
//                     element: <BuildingsLayout />,
//                     children: [
//                       {
//                         path: "results",
//                         element: <BuildingResults />,
//                       },
//                       {
//                         index: true,
//                         element: <Buildings />,
//                         children: [
//                           {
//                             path: ":building_id",
//                             element: <Building />,
//                           },
//                         ],
//                       },
//                     ],
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

//   },

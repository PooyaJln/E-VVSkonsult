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
import FloorResults from "./pages/floors/FloorResults";
import Floor from "./pages/floors/Floor";
import ApartmentsLayout from "./pages/apartments/ApartmentsLayout";
import Apartment from "./pages/apartments/Apartment";
import Apartments from "./pages/apartments/Apartments";
import RoomsLayout from "./pages/rooms/RoomsLayout";
import Room from "./pages/rooms/Room";
import RoomResults from "./pages/rooms/RoomResults";
import Rooms from "./pages/rooms/Rooms";
import ApartmentResults from "./pages/apartments/ApartmentResults";
import Temperatures from "./pages/temperatures/Temperatures";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="heat-loss" element={<HeatLossLayout />}>
        <Route path="help" element={<Help />} />
        <Route path="projects" element={<ProjectsLayout />}>
          <Route index element={<Projects />} />
          <Route path=":project_id" element={<Project />}>
            <Route path="thermalParameters" element={<ThermalParameters />} />
            <Route path="materials" element={<Materials />} />
            <Route path="temperatures" element={<Temperatures />} />
            <Route path="results" element={<ProjectResults />} />
            <Route path="buildings" element={<BuildingsLayout />}>
              <Route index element={<Buildings />} />
              <Route path=":building_id" element={<Building />}>
                <Route path="results" element={<BuildingResults />} />
                <Route path="floors" element={<FloorsLayout />}>
                  <Route index element={<Floors />} />
                  <Route path=":floor_id" element={<Floor />}>
                    <Route path="results" element={<FloorResults />} />
                    <Route path="apartments" element={<ApartmentsLayout />}>
                      <Route index element={<Apartments />} />
                      <Route path=":apartment_id" element={<Apartment />}>
                        <Route path="results" element={<ApartmentResults />} />
                        <Route path="rooms" element={<RoomsLayout />}>
                          <Route index element={<Rooms />} />
                          <Route path=":room_id" element={<Room />} />
                        </Route>
                      </Route>
                    </Route>
                  </Route>
                </Route>
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

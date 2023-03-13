import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/project/Projects";
import Buildings from "./pages/building/Buildings";
import Material from "./pages/material/Materials";

// layouts
import RootLayout from "./layouts/RootLayout";
import HeatLossLayout from "./layouts/HeatLossLayout";
import ThermalParameter from "./pages/thermalParameter/thermalParameter";
import CreateProject from "./pages/project/CreateProject";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />

      <Route path="heat-loss" element={<HeatLossLayout />}>
        
        <Route path="projects" element={<Projects />}>
          
        </Route>
        <Route path="thermalParameters" element={<ThermalParameter />} />
        <Route path="materials" element={<Material />} />
        <Route path="buildings" element={<Buildings />} />
      </Route>

      <Route path="about" element={<About />} />
    </Route>
  )
);

function App() {
  return (
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  );
}

export default App;

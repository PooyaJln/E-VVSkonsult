import React from "react";
import ReactDOM from "react-dom/client";
import { ProjectsContextProvider } from "./contexts/ProjectsContext";

// import styling
import "./index.css";

// importing components
import App from "./App";
import { TemperaturesContextProvider } from "./contexts/TemperaturesContext";
import { ParametersContextProvider } from "./contexts/ParametersContext";
import { ComponentsContextProvider } from "./contexts/ComponentsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProjectsContextProvider>
      <TemperaturesContextProvider>
        <ParametersContextProvider>
          <ComponentsContextProvider>
            <App />
          </ComponentsContextProvider>
        </ParametersContextProvider>
      </TemperaturesContextProvider>
    </ProjectsContextProvider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { ProjectsContextProvider } from "./contexts/ProjectsContext";

// import styling
import "./index.css";

// importing components
import App from "./App";
import { ProjectDataContextProvider } from "./contexts/ProjectDataContext";
import { TemperaturesContextProvider } from "./contexts/TemperaturesContext";
import { ParametersContextProvider } from "./contexts/ParametersContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProjectsContextProvider>
      <TemperaturesContextProvider>
        <ParametersContextProvider>
          <App />
        </ParametersContextProvider>
      </TemperaturesContextProvider>
    </ProjectsContextProvider>
  </React.StrictMode>
);

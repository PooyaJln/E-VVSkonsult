import React from "react";
import ReactDOM from "react-dom/client";
import { ProjectsContextProvider } from "./contexts/ProjectsContext";
import { BuildingsContextProvider } from "./contexts/BuildingsContext";

// import styling
import "./index.css";

// importing components
import App from "./App";
import { ProjectDataContextProvider } from "./contexts/ProjectDataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProjectsContextProvider>
      <ProjectDataContextProvider>
        <BuildingsContextProvider>
          <App />
        </BuildingsContextProvider>
      </ProjectDataContextProvider>
    </ProjectsContextProvider>
  </React.StrictMode>
);

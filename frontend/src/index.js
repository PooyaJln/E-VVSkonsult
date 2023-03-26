import React from "react";
import ReactDOM from "react-dom/client";
import { ProjectsContextProvider } from "./contexts/ProjectsContext";

// import styling
import "./index.css";

// importing components
import App from "./App";
import { ProjectDataContextProvider } from "./contexts/ProjectDataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProjectsContextProvider>
      <App />
    </ProjectsContextProvider>
  </React.StrictMode>
);

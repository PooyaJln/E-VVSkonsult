import React from "react";
import ReactDOM from "react-dom/client";
import { ProjectsContextProvider } from "./contexts/ProjectsContext";

import { store } from "./app/store";
import { Provider } from "react-redux";

// import styling
import "./index.css";

// importing components
import App from "./App";
import { ProjectDataContextProvider } from "./contexts/ProjectDataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

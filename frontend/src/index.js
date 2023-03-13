import React from "react";
import ReactDOM from "react-dom/client";

// import styling
import "./index.css";

// importing components
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

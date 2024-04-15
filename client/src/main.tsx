import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import RouterConfig from "./router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterConfig />
  </React.StrictMode>
);

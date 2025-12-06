import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";
import logo from "./assets/logo.png";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}
const favicon =
  document.querySelector("link[rel='icon']") || document.createElement("link");

favicon.setAttribute("rel", "icon");
favicon.setAttribute("type", "image/png");
favicon.setAttribute("href", logo);
document.head.appendChild(favicon);

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

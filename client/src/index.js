import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/tailwind.css"; // Path to your Tailwind CSS file
import App from "./App";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

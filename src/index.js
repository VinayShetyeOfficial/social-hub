// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";
import { AuthContextProvider } from "./context/AuthContext";
import "./index.css";

// 1) Set Axios base URL for all requests
axios.defaults.baseURL = "http://localhost:8800/api";

// 2) Render the app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);

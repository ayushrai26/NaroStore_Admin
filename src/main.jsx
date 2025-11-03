import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Tailwind CSS import
import { BrowserRouter } from "react-router-dom";
import AuthenticationProvider from "./contextAPI/Authentication/AuthenticationProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthenticationProvider>
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>
  </AuthenticationProvider>
);

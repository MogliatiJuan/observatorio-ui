import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App";
import "./styles/index.css";
import { VerdictsContextProvider } from "./context/VerdictsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <VerdictsContextProvider>
    <App />
  </VerdictsContextProvider>
);

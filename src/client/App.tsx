import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { router } from "./router";

import "./index.css";

export default function App() {
  return <RouterProvider router={router} />;
}

const root = document.getElementById("app");
if (!root) throw new Error("No root element");

ReactDOM.createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

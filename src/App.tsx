import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";

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

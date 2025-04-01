import { trpc, trpcClient } from "@/client/lib/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

const queryClient = new QueryClient();

ReactDOM.createRoot(root).render(
  <StrictMode>
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </trpc.Provider>
  </StrictMode>,
);

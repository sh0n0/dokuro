import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "../pages/settings";

export const Route = createFileRoute("/settings")({
  component: Settings,
});

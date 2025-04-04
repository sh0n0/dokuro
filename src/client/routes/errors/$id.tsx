import { ErrorDetail } from "@/client/pages/ErrorDetail";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/errors/$id")({
  component: Component,
});

function Component() {
  const { id } = useParams({ from: "/errors/$id" });
  return <ErrorDetail id={Number(id)} />;
}

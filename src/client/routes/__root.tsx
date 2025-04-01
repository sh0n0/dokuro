import { Outlet, createRootRoute, useNavigate } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { trpc } from "../lib/trpc";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const navigate = useNavigate();

  trpc.menu.menuEvents.useSubscription(undefined, {
    onData: () => {
      navigate({ to: "/settings" });
    },
  });

  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}

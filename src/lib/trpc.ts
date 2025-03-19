import type { TrpcRouter } from "@/trpcRouter";
import { createTRPCReact } from "@trpc/react-query";
import { ipcLink } from "electron-trpc/renderer";

export const trpc = createTRPCReact<TrpcRouter>();
export const trpcClient = trpc.createClient({
  links: [ipcLink()],
});

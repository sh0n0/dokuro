import { router } from "./trpc";
import { fileWatcherRouter } from "./watcher";

export const trpcRouter = router({
  fileWatcher: fileWatcherRouter,
});

export type TrpcRouter = typeof trpcRouter;

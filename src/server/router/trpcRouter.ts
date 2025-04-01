import { router } from "../trpc";
import { menuRouter } from "./menu";
import { settingsRouter } from "./settings";
import { fileWatcherRouter } from "./watcher";

export const trpcRouter = router({
  fileWatcher: fileWatcherRouter,
  settings: settingsRouter,
  menu: menuRouter,
});

export type TrpcRouter = typeof trpcRouter;

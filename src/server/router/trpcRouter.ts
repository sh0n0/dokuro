import { router } from "../trpc";
import { terminalErrorRouter } from "./errors";
import { menuRouter } from "./menu";
import { settingsRouter } from "./settings";
import { fileWatcherRouter } from "./watcher";

export const trpcRouter = router({
  fileWatcher: fileWatcherRouter,
  terminalErrors: terminalErrorRouter,
  settings: settingsRouter,
  menu: menuRouter,
});

export type TrpcRouter = typeof trpcRouter;

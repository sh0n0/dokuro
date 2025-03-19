import { observable } from "@trpc/server/observable";
import chokidar from "chokidar";
import fs from "node:fs";
import { type Change, diffLines } from "diff";
import { procedure, router } from "./trpc";
import { join } from "node:path";
import { homedir } from "node:os";

const filePath = join(homedir(), ".dokuro", "terminal_errors.log");

type Message = {
  path: string;
  differences: Change[];
  timestamp: string;
};

export const fileWatcherRouter = router({
  watchFile: procedure.subscription(() => {
    return observable<Message>((emit) => {
      let prevContent = fs.existsSync(filePath)
        ? fs.readFileSync(filePath, "utf-8")
        : "";

      const watcher = chokidar.watch(filePath, {
        persistent: true,
      });

      watcher.on("change", (path) => {
        const newContent = fs.readFileSync(path, "utf-8");
        const differences = diffLines(prevContent, newContent);

        emit.next({
          path,
          differences,
          timestamp: new Date().toISOString(),
        });

        prevContent = newContent;
      });

      return () => {
        watcher.close();
      };
    });
  }),
});

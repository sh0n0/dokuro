import fs from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { observable } from "@trpc/server/observable";
import chokidar from "chokidar";
import { diffLines } from "diff";
import { generateExplanation } from "../ai";
import { db } from "../db/connection";
import { insertExplanation } from "../db/query";
import { terminalErrors } from "../db/schema";
import { procedure, router } from "../trpc";

const filePath = join(homedir(), ".dokuro", "terminal_errors.log");

export const fileWatcherRouter = router({
  watchFile: procedure.subscription(() => {
    return observable<TerminalError>((emit) => {
      let prevContent = fs.existsSync(filePath)
        ? fs.readFileSync(filePath, "utf-8")
        : "";

      const watcher = chokidar.watch(filePath, {
        persistent: true,
      });

      watcher.on("change", async (path) => {
        const newContent = fs.readFileSync(path, "utf-8");
        const [, differences] = diffLines(prevContent, newContent);

        prevContent = newContent;
        if (!differences.added) return;

        const [data] = await db
          .insert(terminalErrors)
          .values({
            value: differences.value,
          })
          .returning();
        if (!data) return;

        const { explanation, solution } = await generateExplanation(
          differences.value,
        );
        await insertExplanation(data.id, explanation, solution);

        emit.next({
          id: data.id,
          value: data.value,
          timestamp: data.createdAt,
        });
      });

      return () => {
        watcher.close();
      };
    });
  }),
});

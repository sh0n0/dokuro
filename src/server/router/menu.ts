import { EventEmitter } from "node:events";
import { observable } from "@trpc/server/observable";
import { procedure, router } from "../trpc";

export const menuEvents = new EventEmitter();

export const menuRouter = router({
  menuEvents: procedure.subscription(() => {
    return observable<string>((emit) => {
      const onSettingsClick = (menuAction: string) => {
        emit.next(menuAction);
      };

      menuEvents.on("settingsClick", onSettingsClick);

      return () => {
        menuEvents.off("settingsClick", onSettingsClick);
      };
    });
  }),
});

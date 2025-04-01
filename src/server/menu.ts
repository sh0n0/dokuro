import type { MenuItemConstructorOptions } from "electron";

type params = {
  appName: string;
  onSettingsClick: () => void;
};

export function createMenuTemplate({
  appName,
  onSettingsClick,
}: params): MenuItemConstructorOptions[] {
  return [
    {
      label: appName,
      submenu: [
        { role: "about" },
        { type: "separator" },
        {
          label: "Settings",
          accelerator: "CmdOrCtrl+,",
          click: onSettingsClick,
        },
        { type: "separator" },
        { role: "hide" },
        { role: "hideOthers" },
        { role: "unhide" },
        { type: "separator" },
        { role: "quit" },
      ],
    },
  ];
}

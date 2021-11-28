import { ipcMain } from "electron";
import { operate } from "@/server/server";
import getFilePath from "@/NodeUtil/getFilePath";
ipcMain.on("data-message", (event, arg) => {
  operate(arg).then((res) => {
    event.reply("accept-data", res);
  });
});
ipcMain.on("data-message", (event, arg) => {
  operate(arg).then((res) => {
    event.reply("accept-data", res);
  });
});

ipcMain.on("init_data", (event, arg) => {
  operate(arg).then((res) => {
    event.reply("accept-list", res);
  });
});

ipcMain.on("getPath", (event, arg) => {
  getFilePath.getPath(arg.config).then((res) => {
    event.reply("PathListener", res);
  });
});

import { ipcMain } from "electron";
import { operate } from "@/server/server";
import getFilePath from "@/NodeUtil/getFilePath";
import { readConfig } from "@/NodeUtil/readConfig";
import { generateSQL } from "@/NodeUtil/generateSQL";
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
  getFilePath.getPath(arg).then((res) => {
    event.reply("PathListener", res);
  });
});

ipcMain.on("getPackagePath", (event, arg) => {
  getFilePath.getPackagePath(arg).then((res) => {
    event.reply("PathListener", res);
  });
});

ipcMain.on("getProject", (event, arg) => {
  readConfig(arg.config).then((res) => {
    event.reply("ProjectListener", res);
  });
});

ipcMain.on("generateSQL", (event, arg) => {
  console.log(`arg:`, arg);

  generateSQL(arg).then((res) => {
    event.reply("generateSQLResult", res);
  });
});

const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  appName: "Acti-IA",
});

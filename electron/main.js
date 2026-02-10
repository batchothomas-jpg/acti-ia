import { app, BrowserWindow } from "electron";
import { spawn } from "child_process";
import path from "path";

let backendProcess;

app.whenReady().then(() => {
  const backendPath = path.join(
    app.getAppPath(),
    "backend",
    "server.js"
  );

  backendProcess = spawn("node", [backendPath], {
    stdio: "ignore",
    windowsHide: true
  });

  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(app.getAppPath(), "electron/preload.js")
    }
  });

  win.loadFile("frontend/dist/index.html");
});

app.on("window-all-closed", () => {
  if (backendProcess) backendProcess.kill();
  app.quit();
});

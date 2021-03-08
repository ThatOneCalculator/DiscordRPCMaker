const { app, BrowserWindow, globalShortcut, Notification } = require("electron")
const path = require("path")

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js"),
      icon: path.join(__dirname, "/assets/icon.png")
    }
  })
  //win.setResizable(false);
  
  globalShortcut.register("f5", function() {
      win.reload()
  })
  globalShortcut.register("CommandOrControl+R", function() {
      win.reload()
  })
  globalShortcut.register("Control+Shift+I", function() {
    win.webContents.openDevTools();
  })


  win.loadFile("index.html")
  win.setMenu(null)
  
}

app.whenReady().then(createWindow)

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

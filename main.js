const { app, BrowserWindow, globalShortcut, Notification } = require("electron")
const path = require("path")

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js"),
      icon: path.join(__dirname, "/assets/icon.png")
    }
  })
  
  globalShortcut.register("f5", function() {
      console.log("f5 is pressed")
      win.reload()
  })
  globalShortcut.register("CommandOrControl+R", function() {
      console.log("CommandOrControl+R is pressed")
      win.reload()
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

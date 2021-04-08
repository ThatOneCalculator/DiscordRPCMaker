const { app, BrowserWindow, Notification, Menu, MenuItem } = require("electron")
const path = require("path")

require('@electron/remote/main').initialize()

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 700,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js"),
      icon: path.join(__dirname, "/assets/icon.png")
    }
  })
  //win.setResizable(false);

  /*globalShortcut.register("f5", function() {
      win.reload()
  })
  globalShortcut.register("CommandOrControl+R", function() {
      win.reload()
  })
  globalShortcut.register("Control+Shift+I", function() {
    win.webContents.openDevTools();
  })*/
  const menu = new Menu()
  menu.append(new MenuItem({
    label: 'Options',
    submenu: [{
      label: 'Reload',
      accelerator: "f5",
      click: () => { win.reload() }
    },
    {
      label: 'Reload but with Ctrl+R',
      accelerator: "CommandOrControl+R",
      click: () => { win.reload() }
    },
    {
      label: 'Open Devtools',
      accelerator: "CommandOrControl+Shift+I",
      click: () => { win.webContents.openDevTools(); }
    }]
  }))

  Menu.setApplicationMenu(menu)
  //TODO: add a html button to show this for some peeps who don't know the hotkeys by default
  win.setMenuBarVisibility(false)
  win.loadFile("index.html")

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

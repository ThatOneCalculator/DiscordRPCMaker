// libappindicator-gtk3 on Arch as req
const { app, BrowserWindow, Notification, Menu, MenuItem, ipcMain, Tray } = require("electron")
const path = require("path")
const fs = require('fs')
const os = require('os')
const EventEmitter = require("events")
require('@electron/remote/main').initialize()
const iconpath = path.join(__dirname, "/assets/icon.png")
const loadingEvents = new EventEmitter()

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
      icon: iconpath
    }
  })
  win.on('minimize', function (event) {
    event.preventDefault();
    win.hide();
  })

  win.on('close', function (event) {
    if (!app.isQuiting) {
      event.preventDefault();
      win.hide();
    }

    return false;
  })
  win.setIcon(iconpath)
  //win.setResizable(false);
  const menu = Menu()
  // menu.append(new MenuItem({
  //   label: 'Options',
  //   submenu: [{
  //     label: 'Reload',
  //     accelerator: "f5",
  //     click: () => { win.reload() }
  //   },
  //   {
  //     label: 'Reload',
  //     accelerator: "CommandOrControl+R",
  //     click: () => { win.reload() }
  //   },
  //   {
  //     label: 'Open Devtools',
  //     accelerator: "CommandOrControl+Shift+I",
  //     click: () => { win.webContents.openDevTools(); }
  //   }]
  // }))

  // Menu.setApplicationMenu(menu)
  //TODO: add a html button to show this for some peeps who don't know the hotkeys by default
  win.setMenuBarVisibility(false)

  //start loading screen
  win.loadFile("loading.html")

  loadingEvents.on('finished', () => {
    win.loadFile('index.html')
  })

  //load for one second, then do an internet check
  setTimeout(() => {
    require('dns').resolve("https://drpcm.t1c.dev", function (err) {
      if (err) {
        noInternet(win)
      } else {
        setTimeout(() => loadingEvents.emit('finished'), 250)
      }
    })
  }, 250)

  function noInternet() {
    require('dns').resolve("https://drpcm.t1c.dev", function (err) {
      if (err) {
        win.webContents.send("no-internet")
        console.log("sending no internet")
        setTimeout(noInternet, 5000)
      } else {
        //when we connect just stop loading
        loadingEvents.emit('finished')
      }
    })
  }
  app.on('window-all-closed', app.quit);
  app.on('before-quit', () => {
    win.removeAllListeners('close');
    win.close();
  })
}

app.whenReady().then(() => {
  createWindow()
  win = BrowserWindow.getAllWindows()[0]
  if (os.platform() == "darwin") {
    appIcon = new Tray(path.join(__dirname, "/assets/iconMacTemplate.png"))
  }
  else {
    appIcon = new Tray(iconpath)
  }
  const contextMenu = new Menu()
  contextMenu.append(new MenuItem({
    label: 'Quit',
    click: () => { app.quit() }
  }))
  contextMenu.append(new MenuItem({
    label: 'Show',
    click: () => { app.isquitting = true; win.show() }
  }))
  appIcon.setContextMenu(contextMenu)
  appIcon.setToolTip("Discord RPC Maker")
})

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
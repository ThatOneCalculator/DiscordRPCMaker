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

  let settings = {}

  try {
    let dir = `${os.userInfo().homedir}/${process.platform === 'win32' ? '/AppData/Roaming/drpcm/' : '/.config/drpcm/'}`
    let opendir = dir.replaceAll("/", "\\").replaceAll("\\\\", "\\")
    let settingspath = os.platform() == "win32" ? opendir + "\\" + "settings.json" : dir + "/" + "settings.json"
    settings = JSON.parse(fs.readFileSync(settingspath, 'utf8'))
  }
  catch (e) {
    console.log(e)
    settings = {
      launchedpresence: false,
      language: "english",
      theme: "dark",
      quitonx: false,
      showtimestamp: false
    }
    fs.writeFileSync(`${dir}${slash}settings.json`, JSON.stringify(settings, null, 2), 'utf8', (err) => {
      if (err) { throw err }
      else { console.log("Wrote base settings") }
    })
  }
  if (settings['quitonx'] == false) {
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
  }
  win.setIcon(iconpath)
  //win.setResizable(false);
  const menu = Menu()
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
  }, 200)

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
    appIcon = new Tray(path.join(__dirname, "/assets/iconTemplate.png"))
  }
  else {
    appIcon = new Tray(iconpath)
  }
  const contextMenu = new Menu()
  contextMenu.append(new MenuItem({
    label: 'Show Discord RPC Maker',
    click: () => { app.isquitting = true; win.show() }
  }))
  contextMenu.append(new MenuItem({
    label: 'Quit Discord RPC Maker',
    click: () => { app.quit() }
  }))
  appIcon.setContextMenu(contextMenu)
  appIcon.setToolTip("Discord RPC Maker")
})

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
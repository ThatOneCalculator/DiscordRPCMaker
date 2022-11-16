// libappindicator-gtk3 on Arch as req

const {
  app,
  BrowserWindow,
  Menu,
  MenuItem,
  Tray,
  dialog,
} = require("electron");
const path = require("path");
const fs = require("fs");
const os = require("os");
const RPC = require("discord-rpc");
const EventEmitter = require("events");

if (require("electron-squirrel-startup")) app.quit();
require("@electron/remote/main").initialize();

const iconpath = path.join(__dirname, "/assets/icon.png");
const loadingEvents = new EventEmitter();
const slash = os.platform() == "win32" ? "\\" : "/";
let dir = `${os.userInfo().homedir}/${
  process.platform === "win32" ? "/AppData/Roaming/drpcm/" : "/.config/drpcm/"
}`;
let opendir = dir.replaceAll("/", "\\").replaceAll("\\\\", "\\");

let win = null;

const args = process.argv.slice(2);
const id = args[0];

if (id !== undefined) {
  const dir = `${os.userInfo().homedir}/${
    process.platform === "win32" ? "/AppData/Roaming/drpcm/" : "/.config/drpcm/"
  }`;
  let client = new RPC.Client({ transport: "ipc" });

  let opendir = dir.replace("/", "\\").replace("\\\\", "\\");
  let fullpath =
    os.platform() == "win32"
      ? opendir + "\\" + id + ".json"
      : dir + "/" + id + ".json";
  let settingspath =
    os.platform() == "win32"
      ? opendir + "\\" + "settings.json"
      : dir + "/" + "settings.json";
  let options = JSON.parse(fs.readFileSync(fullpath, "utf8"));
  let settings = JSON.parse(fs.readFileSync(settingspath, "utf8"));
  let activity = {};
  let assets = {};

  if (options.largeimage !== "") {
    activity.largeImageKey = options.largeimage;
    // If you change this and some asks about this, please still give me credit :)
    activity.largeImageText =
      "Made with ThatOneCalculator's Discord RPC Maker (v2.1.1 CLI)!";
  }
  if (options.smallimage !== "") {
    activity.smallImageKey = options.smallimage;
    // Same applies with assets.large_text
    activity.smallImageText = "https://drpcm.t1c.dev/";
  }

  if (assets !== {}) activity.assets = assets;

  if (options.description !== "") activity.details = options.description;

  if (options.state !== "") activity.state = options.state;

  if (options.buttons.length !== 0) activity.buttons = options.buttons;

  if (settings.showtimestamp) activity.startTimestamp = Date.now();

  const assembleClient = (timeout = 5000) => {
    client.destroy();
    client = new RPC.Client({ transport: "ipc" });
    client.on("ready", () => {
      running = true;
      client.setActivity(activity);
      client.transport.socket.on("close", () => {
        assembleClient();
      });
    });
    setTimeout(() => client.login({ clientId: options.clientid }), timeout);
  };

  process.on("unhandledRejection", (e) => {
    if (e.message === "Could not connect") {
      console.log("Crashed! Retrying...");
      assembleClient();
    }
  });

  assembleClient(1000);

  console.log("Started!");
} else {
  const createWindow = () => {
    win = new BrowserWindow({
      width: 1200,
      height: 700,
      minWidth: 900,
      minHeight: 600,
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: true,
        enableRemoteModule: true,
        preload: path.join(__dirname, "preload.js"),
        icon: iconpath,
      },
    });

    require("@electron/remote/main").enable(win.webContents);

    let settings = {};

    if (!fs.existsSync(dir)) {
      initialdata = {
        launchedpresence: false,
        language: "english",
        theme: "dark",
        quitonx: false,
        showtimestamp: false,
      };
      if (os.platform() == "win32") {
        fs.mkdirSync(opendir, { recursive: true });
      } else {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.copyFileSync(
        `${path.join(__dirname, `${slash}themes${slash}dark.css`)}`,
        `${dir}${slash}custom.css`
      );
      fs.writeFile(
        `${dir}${slash}settings.json`,
        JSON.stringify(initialdata, null, 2),
        "utf8",
        (err) => {
          if (err) {
            throw err;
          } else {
            console.log("First launch");
          }
        }
      );
      //welcome message
      const msg = {
        type: "question",
        buttons: [],
        defaultId: 0,
        title: "Welcome",
        message: "Thank you for choosing Discord RPC Maker!",
        detail:
          "If you need instructions, click the question (?) icon in the bottom right.",
      };
      dialog.showMessageBox(null, msg);
    }

    try {
      let settingspath =
        os.platform() == "win32"
          ? opendir + "\\" + "settings.json"
          : dir + "/" + "settings.json";
      settings = JSON.parse(fs.readFileSync(settingspath, "utf8"));
    } catch (e) {
      console.log(e);
      fs.mkdirSync(dir, { recursive: true });
      settings = {
        launchedpresence: false,
        language: "english",
        theme: "dark",
        quitonx: false,
        showtimestamp: false,
      };
      fs.writeFileSync(
        `${dir}${slash}settings.json`,
        JSON.stringify(settings, null, 2),
        "utf8",
        (err) => {
          if (err) {
            throw err;
          } else {
            console.log("Wrote base settings");
          }
        }
      );
    }
    if (settings["quitonx"] == false) {
      win.on("minimize", (event) => {
        event.preventDefault();
        win.hide();
      });

      win.on("close", (event) => {
        if (!app.isQuiting) {
          event.preventDefault();
          win.hide();
        }

        return false;
      });
    }
    win.setIcon(iconpath);
    //win.setResizable(false);
    win.setMenuBarVisibility(false);

    if (os.platform() !== "win32") {
      //start loading screen
      win.loadFile("loading.html");

      loadingEvents.on("finished", () => {
        win.loadFile("index.html");
      });

      //load for one second, then do an internet check
      setTimeout(() => {
        require("dns").resolve("https://drpcm.t1c.dev", (err) => {
          if (err) {
            console.log(`\n\nERROR HERE: ${err.message}\n\n`);
            noInternet(win);
          } else {
            setTimeout(() => loadingEvents.emit("finished"), 250);
          }
        });
      }, 150);

      const noInternet = () => {
        require("dns").resolve("https://drpcm.t1c.dev", (err) => {
          if (err) {
            win.webContents.send("no-internet");
            console.log("sending no internet");
            setTimeout(noInternet, 5000);
          } else {
            //when we connect just stop loading
            loadingEvents.emit("finished");
          }
        });
      };
    } else {
      win.loadFile("index.html");
    }

    app.on("window-all-closed", () => {
      if (process.platform !== "darwin") app.quit();
    });

    app.on("before-quit", () => {
      win.removeAllListeners("close");
      win.close();
    });
  };

  const gotTheLock = app.requestSingleInstanceLock();

  if (!gotTheLock) {
    app.quit();
  } else {
    app.on("second-instance", () => {
      // Someone tried to run a second instance, we should focus our window.
      if (win) {
        if (win.isMinimized()) win.restore();
        win.focus();
        win.show();
      }
    });

    // Create myWindow, load the rest of the app, etc...
    app.whenReady().then(() => {
      console.log("App ready");
      createWindow();

      app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
      });

      win = BrowserWindow.getAllWindows()[0];
      if (os.platform() == "darwin") {
        appIcon = new Tray(path.join(__dirname, "/assets/iconTemplate.png"));
      } else {
        appIcon = new Tray(iconpath);
      }
      const contextMenu = new Menu();
      contextMenu.append(
        new MenuItem({
          label: "Show Discord RPC Maker",
          click: () => {
            app.isquitting = true;
            win.show();
          },
        })
      );
      contextMenu.append(
        new MenuItem({
          label: "Quit Discord RPC Maker",
          click: () => {
            app.quit();
          },
        })
      );
      appIcon.setContextMenu(contextMenu);
      appIcon.setToolTip("Discord RPC Maker");
    });
  }
}

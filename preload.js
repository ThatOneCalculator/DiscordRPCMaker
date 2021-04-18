const fs = require('fs')
const os = require('os')
const path = require('path')
const RPC = require('discord-rpc')
const openExplorer = require('open-file-explorer')
const { ipcRenderer } = require('electron')
const { dialog, shell, BrowserWindow } = require('@electron/remote')
const slash = os.platform() == 'win32' ? "\\" : "/"

const dir = `${os.userInfo().homedir}/${process.platform === 'win32' ? '/AppData/Roaming/drpcm/' : '/.config/drpcm/'}`

let clientID = 0
var options = {}
let client = new RPC.Client({ transport: 'ipc' })

let inputs = []

//url validation regex
function validateurl(str) {
  const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/

  return regexp.test(str)
}
function dec2hex(dec) {
  return dec.toString(16).padStart(2, "0")
}

function generateId(len) {
  let arr = new Uint8Array((len || 40) / 2)
  window.crypto.getRandomValues(arr)
  return Array.from(arr, dec2hex).join('')
}

//get the image id from options provided the name
function getImageIdFromName(imgName) {
  let matchedid = ""
  options.forEach((image, i, arr) => {
    if (image.name == imgName) {
      matchedid = image.id
    }
  })
  return matchedid
}

//check for appdata / .config dir and make it if it doesen't exist
if (!fs.existsSync(dir)) {
  initialdata = {
    launchedpresence: false,
    language: "english",
    theme: "dark",
    quitonx: false
  }
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFile(`${dir}/settings.json`, JSON.stringify(initialdata, null, 2), 'utf8', (err) => {
    if (err) { throw err }
    else {
      const myNotification = new Notification("Discord RPC Maker", {
        body: "First launch",
        icon: "assets/icon.png",
        timeoutType: "default",
      })
    }
  })
  const msg = {
    type: 'question',
    buttons: [],
    defaultId: 0,
    title: 'Welcome',
    message: 'Thank you for choosing Discord RPC Maker!',
    detail: 'If you need instructions, click the question (?) icon in the bottom right.',
  };
  dialog.showMessageBox(null, msg)
}

function openModal() {
  const modal = document.querySelector("#modal");
  document.querySelector(".main-grid").classList.add("modal-open");

  modal.classList.add("open");
}

function closeModal() {
  modal.classList.remove("open");
  document.querySelector(".main-grid").classList.remove("modal-open");
}

window.addEventListener("keydown", (event) => {
  if (event.keyCode !== 27) return;
  closeModal();

  console.log(event);
});

//make the border red if url validation fails
function updateValidButton(button, event) {
  url = event.target.value
  isValid = validateurl(url)

  if (isValid) {
    button.classList.remove("danger")
    event.target.classList.add("input-success")
  } else {
    event.target.classList.remove("input-success")
    button.classList.add("danger")
  }
}

function saveAsJson() {
  let presencename = document.getElementById("presence-name-input").value.toString()
  let presenceid = document.getElementById("presence-id").value.toString()
  let description = document.getElementById("description-input-1").value.toString()
  let state = document.getElementById("description-input-2").value.toString()
  let largeimage = document.getElementById("large-image-input").value.toString()
  let smallimage = document.getElementById("small-image-input").value.toString()
  let buttononelabel = document.getElementById("button1-input-name").value.toString()
  let buttononeurl = document.getElementById("button1-input-url").value.toString()
  if (!buttononeurl.startsWith('http')) { buttononeurl = 'https://' + buttononeurl }
  let buttontwolabel = document.getElementById("button2-input-name").value.toString()
  let buttontwourl = document.getElementById("button2-input-url").value.toString()
  if (!buttontwourl.startsWith('http')) { buttontwourl = 'https://' + buttontwourl }
  buttonone = { label: buttononelabel, url: buttononeurl }
  buttontwo = { label: buttontwolabel, url: buttontwourl }
  const buttons = []
  if (document.getElementById("button1-enable").checked && validateurl(buttononeurl)) { buttons.push(buttonone) }
  if (document.getElementById("button2-enable").checked && validateurl(buttontwourl)) { buttons.push(buttontwo) }
  const content = {
    name: presencename,
    clientid: clientID,
    description: description,
    state: state,
    largeimage: largeimage,
    smallimage: smallimage,
    buttons: buttons
  }

  const data = JSON.stringify(content, null, 2)
  let filename = presenceid == "" ? generateId(10) : presenceid
  fs.writeFile(`${dir}/${filename}.json`, data, 'utf8', (err) => {
    if (err) { throw err }
    else {
      const myNotification = new Notification("Discord RPC Maker", {
        body: "Your presence has been saved.",
        icon: "assets/plus.png",
        timeoutType: "default",
      })
    }
  })
  return filename
}

async function bootClientId(presence) {
  //checks what is in clientid input
  let inp = document.querySelector(".client-id-enabler")
  let enableOnClientid = document.querySelectorAll(".enable-on-clientid")
  enableOnClientid.forEach((item, i, arr) => {
    item.disabled = true;
  })

  let button1enable = document.getElementById("button1-enable")
  let button2enable = document.getElementById("button2-enable")
  let btn1label = document.getElementById("button1-input-name")
  let btn1url = document.getElementById("button1-input-url")
  let btn2label = document.getElementById("button2-input-name")
  let btn2url = document.getElementById("button2-input-url")

  btn1label.value = ""
  btn2label.value = ""
  btn1url.value = ""
  btn2url.value = ""
  if (button1enable.checked) { button1enable.click() }
  document.getElementById("small-image").src = "assets/blank.png"

  //checks if clientid input has a valid clientid (long enough, only numbers)
  if (presence.addDanger == true) {
    inp.classList.remove("input-success")
    inp.classList.add("input-danger")
  }
  if (inp.value !== "" && inp.value.toString().length > 17 && isNaN(parseInt(inp.value)) == false) {
    //call discord api to make sure clientid is valid
    let response = await fetch(`https://discord.com/api/oauth2/applications/${inp.value.toString()}/assets`)
    if (response.ok) {
      //client id is valid, enable inputs
      options = await fetch(`https://discord.com/api/oauth2/applications/${inp.value.toString()}/assets`).then(options => options.json())
      clientID = inp.value//get clientid and store it

      console.log(options)

      //enable everything on valid clientid
      enableOnClientid.forEach((item, i, arr) => {
        item.removeAttribute("disabled")
      })

      //populate the image input datalists with fetched names of images from the discord api
      imageinputs = document.querySelectorAll("#small-image-list, #large-image-list")
      imageinputs.forEach((item, i, arr) => {
        htmll = ``
        options.forEach((opt, index, array) => {
          htmll += `<option image-id="${opt.id}">${opt.name}</option>`
        })
        item.innerHTML = htmll
      })

      //if we are loading a presence
      console.log("loading: ", presence)
      if (Object.keys(presence).length > 0) {
        //console.log("loading: ", presence)

        let largeimg = document.getElementById("large-image-input")
        let smallimg = document.getElementById("small-image-input")
        let desc1 = document.getElementById("description-input-1")
        let desc2 = document.getElementById("description-input-2")


        //fill in the values from provided presence, and simulate user clicking / typing in the inputs, so the preview updates.
        largeimg.value = presence.largeimage
        largeimg.dispatchEvent(new KeyboardEvent("keyup"))

        smallimg.value = presence.smallimage
        smallimg.dispatchEvent(new KeyboardEvent("keyup"))

        desc1.value = presence.description
        desc2.value = presence.state

        desc1.dispatchEvent(new KeyboardEvent("keyup"))
        desc2.dispatchEvent(new KeyboardEvent("keyup"))

        if (presence.buttons.length > 0) {
          if (presence.buttons.length == 2) {
            button1enable.checked = false;
            button2enable.checked = false;
            button1enable.click()
            button2enable.click()

            btn1label.value = presence.buttons[0].label
            btn1url.value = presence.buttons[0].url

            btn2label.value = presence.buttons[1].label
            btn2url.value = presence.buttons[1].url

          } else if (presence.buttons.length == 1) {
            button1enable.checked = false;
            button1enable.click()

            btn1label.value = presence.buttons[0].label
            btn1url.value = presence.buttons[0].url
          }
          btn1label.dispatchEvent(new KeyboardEvent("keyup"))
          btn2label.dispatchEvent(new KeyboardEvent("keyup"))
          btn1url.dispatchEvent(new KeyboardEvent("keyup"))
          btn2url.dispatchEvent(new KeyboardEvent("keyup"))
        }

      }
      inp.classList.remove("input-danger")
      inp.classList.add("input-success")
    } else {
      inp.classList.remove("input-success")
      inp.classList.add("input-danger")
    }
  }
}

//what to do when dom loads
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("no-internet-msg") != null) {
    console.log("waiting for no internet")
    ipcRenderer.on('no-internet', (event, arg) => {
      document.getElementById("no-internet-msg").style.display = "block"
    });
  }

  console.log("loaded")
  //load presences
  loadSavedPresences()

  inputs = [
    document.getElementById("clientid-input"),
    document.getElementById("presence-name-input"),
    document.getElementById("large-image-input"),
    document.getElementById("small-image-input"),
    document.getElementById("description-input-1"),
    document.getElementById("description-input-2"),
    document.getElementById("presence-id"),
    document.getElementById("small-image-input")
  ]

  //launch presence
  document.getElementById("test").addEventListener("click", () => {
    let opendir = dir.replaceAll("/", "\\").replaceAll("\\\\", "\\")
    let id = document.getElementById("presence-id").value
    let fullpath = os.platform() == "win32" ? opendir + "\\" + id + ".json" : dir + "/" + id + ".json"
    let settingspath = os.platform() == "win32" ? opendir + "\\" + "settings.json" : dir + "/" + "settings.json"
    const options = JSON.parse(fs.readFileSync(fullpath, 'utf8'))
    let settings = JSON.parse(fs.readFileSync(settingspath, 'utf8'))
    const activity = {}
    const assets = {}

    if (options.largeimage !== '') {
      assets.large_image = options.largeimage
      // If you change this and some asks about this, please still give me credit :)
      assets.large_text = "Made with ThatOneCalculator's Discord RPC Maker (v2.0)!"
    }
    if (options.smallimage !== '') {
      assets.small_image = options.smallimage
      // Same applies with assets.large_text
      assets.small_text = 'https://drpcm.t1c.dev/'
    }
    if (assets !== {}) { activity.assets = assets }
    if (options.description !== '') { activity.details = options.description }
    if (options.state !== '') { activity.state = options.state }
    if (options.buttons.length !== 0) { activity.buttons = options.buttons }

    function assembleClient(timeout = 5000) {
      client.destroy()
      client = new RPC.Client({ transport: 'ipc' })
      client.on('ready', () => {
        running = true;
        client.request('SET_ACTIVITY', {
          pid: process.pid,
          activity: activity
        })
        console.log(chalk`{bold.green Your Rich Presence has started!} Generated by {blue.underline https://github.com/ThatOneCalculator/DiscordRPCMaker}`)
        client.transport.socket.on("close", (c, s) => {
          console.log(chalk`{bold.red Connection closed. }{green Attempting to reopen in 5 seconds.}`)
          assembleClient()
        })
      })
      setTimeout(() => client.login({ clientId: options.clientid }), timeout)
    }

    process.on("unhandledRejection", e => {
      if (e.message === "Could not connect") {
        console.log(chalk`{bold.red Failed to connect.}\n{bold.green Retrying in 5 seconds.}`)
        assembleClient()
      }
    })

    assembleClient(0)

    const myNotification = new Notification("Discord RPC Maker", {
      body: "Your presence has started.",
      icon: "assets/icon.png",
      timeoutType: "default",
    });
    if (settings.launchedpresence == false) {
      settings.launchedpresence = true
      fs.writeFile(`${dir}/settings.json`, JSON.stringify(settings, null, 2), 'utf8', (err) => {
        if (err) { throw err }
        else {
          const msg = {
            type: 'question',
            buttons: ['Close', 'Star on GitHub', 'Join the Discord', 'Donate'],
            defaultId: 0,
            title: 'Welcome',
            message: 'Congrats, you launched your first presence!',
            detail: 'Don\'t worry, this is the last time you\'ll see this. This project is and always will be free and open source. If you want to show your support, please consider donating, leaving a star on the GitHub, and/or joining the Discord server.',
          };
          dialog.showMessageBox(null, msg).then(result => {
            if (result.response == 1) {
              shell.openExternal('https://github.com/thatonecalculator/discordrpcmaker')
            }
            if (result.response == 2) {
              shell.openExternal('https://discord.com/invite/Z7UZPR3bbW')
            }
            if (result.response == 3) {
              shell.openExternal('https://buymeacoffee.com/that1calculator')
            }
          })
        }
      })
    }

  });

  document.getElementById("new-presence-button").addEventListener("click", () => {
    let empty = {
      buttons: [],
      clientid: "",
      description: "",
      largeimage: "",
      smallimage: "",
      name: "",
      state: "",
      addDanger: true
    }
    inputs.forEach((input) => {
      input.value = ""
      input.dispatchEvent(new KeyboardEvent("keyup"))
    })

    document.getElementById("small-image-input").setAttribute("disabled", "true")
    document.getElementById("del-btn").setAttribute("disabled", "true")
    document.getElementById("file-btn").setAttribute("disabled", "true")
    bootClientId(empty)
  });

  //save presence
  document.getElementById("save").addEventListener("click", () => {
    filename = saveAsJson()
    reloadPresences()
    //document.getElementById("new-presence-button").click()
    document.getElementById("del-btn").removeAttribute("disabled")
    document.getElementById("file-btn").removeAttribute("disabled")
    document.getElementById("presence-id").value = filename
  });

  document.getElementById("del-btn").addEventListener("click", () => {
    const options = {
      type: 'question',
      buttons: ['Cancel', 'Delete'],
      defaultId: 0,
      title: 'Delete presence',
      message: 'Are you sure you want to delete this presence?',
      detail: 'This cannot be undone.',
    };
    dialog.showMessageBox(null, options).then(result => {
      if (result.response == 1) { //delete the presence
        let opendir = dir.replaceAll("/", "\\").replaceAll("\\\\", "\\")
        let id = document.getElementById("presence-id").value
        let fullpath = os.platform() == "win32" ? opendir + "\\" + id + ".json" : dir + "/" + id + ".json"

        //delete the file
        fs.stat(fullpath, function (err, stat) {
          if (err == null) { //get if it exists
            console.log(`${id}.json exists`);
            fs.unlink(fullpath, (err) => {
              if (err) { throw err; }
              console.log("File is deleted."); //log that we deleted it
              reloadPresences(); //reload the presences
              const myNotification = new Notification("Discord RPC Maker", { //throw a notification
                body: `'${document.getElementById("presence-name-input").value}' has been deleted.`,
                icon: "assets/icon.png",
                timeoutType: "default",
              })
              document.getElementById("new-presence-button").click() //clear all inputs
            });

          } else if (err.code === 'ENOENT') { //if it doesen't exist then don't delete it lul
            console.log(`${id}.json doesen't exist, nothing deleted.`)
          } else {
            alert('error while trying to delete file: ', err.code);
          }

        });
      }
    }).catch(err => {
      console.log("error while trying to create message box: " + err)
    })
  })

  document.getElementById("file-btn").addEventListener("click", () => {
    let opendir = dir.replaceAll("/", "\\").replaceAll("\\\\", "\\")
    if (process.platform !== "win32") { openExplorer(dir) }
    else { openExplorer(opendir) }
  });

  //enable inputs 
  document.querySelector(".client-id-enabler").addEventListener("keyup", () => { bootClientId({}) })

  function loadSavedPresences() {
    let files = fs.readdir(dir, (directory, files) => {
      console.log(files)
      let wrapper = document.getElementById('presence-scroller')
      files.forEach(file => {
        console.log(file)
        if (file.includes(".json") && file.includes("settings") == false) {
          let presence = JSON.parse(fs.readFileSync(dir + file, 'utf8'));
          let elem = document.createElement('div')
          html = `
        <div class="presence-list-item">
          <div class="presence-item-title">${presence.name}</div>
          <div class="presence-item-id text secondary">File: ${file.replaceAll(".json", "")}</div>
          <button class="presence-edit"><i class="fas fa-edit"></i></button>
        </div>
        `
          elem.innerHTML = html
          wrapper.appendChild(elem)

          elem.querySelector('.presence-edit').addEventListener("click", () => {
            loadPresence(presence, file)
          })
        }
      })
    })
  }

  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  function reloadPresences() {
    let wrapper = document.getElementById('presence-scroller')
    removeAllChildNodes(wrapper)
    loadSavedPresences()
  }

  //button enabling
  document.getElementById("button1-enable").addEventListener("change", () => {
    if (document.getElementById("button1-enable").checked) {
      //enable all buttons
      inps = document.querySelector(".button1")
      inps.querySelectorAll('input[disabled]').forEach((item, i, arr) => {
        item.removeAttribute("disabled");
      });

      document.getElementById('button2-enable').removeAttribute('disabled')
      document.getElementById("preview-button-1").classList.remove("initially-hidden")
      document.getElementById("button1-input-name").addEventListener("keyup", (event) => { document.getElementById("preview-button-1").innerHTML = event.target.value })
      document.getElementById("button1-input-url").addEventListener("keyup", (event) => { updateValidButton(document.getElementById("preview-button-1"), event) })
    } else {
      //disable buttons
      inps = document.querySelector(".button1")
      inps.querySelectorAll('input[type="text"]').forEach((item, i, arr) => {
        item.setAttribute("disabled", "");
      });

      button2enable = document.getElementById('button2-enable')
      document.getElementById("preview-button-1").classList.add("initially-hidden")
      if (button2enable.checked == true) { button2enable.click() }
      button2enable.disabled = true;

      try {
        //remove preview updating listeners
        document.getElementById("button1-input-name").removeEventListener("keyup", (event) => { document.getElementById("preview-button-1").innerHTML = event.target.value })
        document.getElementById("button2-input-name").removeEventListener("keyup", (event) => { document.getElementById("preview-button-2").innerHTML = event.target.value })
        //remove url validation listeners
        document.getElementById("button1-input-url").removeEventListener("keyup", (event) => { updateValidButton(document.getElementById("preview-button-1"), event) })
        document.getElementById("button2-input-url").removeEventListener("keyup", (event) => { updateValidButton(document.getElementById("preview-button-2"), event) })
      } catch (e) { }
    }
  });
  document.getElementById("button2-enable").addEventListener("change", () => {
    if (document.getElementById("button2-enable").checked) {
      //enable second button
      inps = document.querySelector(".button2")
      inps.querySelectorAll('input[disabled]').forEach((item, i, arr) => {
        item.removeAttribute("disabled");
      });
      document.getElementById("preview-button-2").classList.remove("initially-hidden")
      document.getElementById("button2-input-name").addEventListener("keyup", (event) => { document.getElementById("preview-button-2").innerHTML = event.target.value })
      document.getElementById("button2-input-url").addEventListener("keyup", (event) => { updateValidButton(document.getElementById("preview-button-2"), event) })
    } else {
      inps = document.querySelector(".button2")
      //disable second button
      inps.querySelectorAll('input[type="text"]').forEach((item, i, arr) => {
        item.setAttribute("disabled", "");
      });
      document.getElementById("preview-button-2").classList.add("initially-hidden")
      document.getElementById("button2-input-name").removeEventListener("keyup", (event) => { document.getElementById("preview-button-2").innerHTML = event.target.value })
      document.getElementById("button2-input-url").removeEventListener("keyup", (event) => { updateValidButton(document.getElementById("preview-button-2"), event) })
    }
  });

  //description line 1 updating
  document.getElementById("description-input-1").addEventListener("keyup", (event) => {
    document.getElementById("preview-description-1").innerHTML = event.target.value
  });

  //description line 2 updating
  document.getElementById("description-input-2").addEventListener("keyup", (event) => {
    document.getElementById("preview-description-2").innerHTML = event.target.value
  });

  //updating of the large image
  document.getElementById("large-image-input").addEventListener("keyup", () => {
    let input = document.getElementById("large-image-input")
    let imgname = input.value
    let largeimage = document.getElementById("large-image")
    let imgid = getImageIdFromName(imgname)

    //if said image doesen't exist, show placeholder
    if (imgid == "") {
      largeimage.setAttribute("src", "assets/placeholder.png")
      document.getElementById("small-image-input").setAttribute("disabled", "");
    } else {
      largeimage.setAttribute("src", `https://cdn.discordapp.com/app-assets/${clientID}/${imgid}.png`)
      document.getElementById("small-image-input").removeAttribute("disabled");
    }
  })

  document.getElementById("small-image-input").addEventListener("keyup", () => {
    let input = document.getElementById("small-image-input")
    let imgname = input.value
    let smallimage = document.getElementById("small-image")

    let imgid = getImageIdFromName(imgname)

    //if said image doesen't exist, show placeholder
    if (imgid == "") {
      smallimage.setAttribute("src", "assets/placeholder.png")
    } else {
      smallimage.setAttribute("src", `https://cdn.discordapp.com/app-assets/${clientID}/${imgid}.png`)
    }
  })

  //fix win outline
  if (process.platform === "linux") {
    h1 = document.querySelectorAll("h1")
    h1.forEach((item, i, arr) => {
      item.setAttribute("style", "-webkit-text-stroke-width: 2px")
    })
  }

  //make links open in new tab
  registerLinkToOpenInBrowser("github-button", "https://github.com/ThatOneCalculator/DiscordRPCMaker")
  registerLinkToOpenInBrowser("discord-button", "https://discord.com/invite/Z7UZPR3bbW")
  registerLinkToOpenInBrowser("web-button", "https://drpcm.t1c.dev")

  document.getElementById("devel").addEventListener("click", () => {
    develWindow = new BrowserWindow({
      width: 1200,
      height: 700,
      webPreferences: {
        nodeIntegration: true,
        preload: `${__dirname}${slash}clientidDetect.js`
      }
    });
    //load html into window
    develWindow.loadURL('https://discord.com/developers');
    develWindow.webContents.openDevTools();
    //garbage collection handle
    develWindow.on('close', function () {
      develWindow = null;
    });
  })

  document.querySelector('#donate-button').addEventListener("click", () => {
    const options = {
      type: 'question',
      buttons: ['Never mind', 'Liberapay', 'BuyMeACoffee'],
      defaultId: 0,
      title: 'Donate',
      message: 'Thanks for supporting the project! Liberapay is for recurring donations, and BuyMeACoffee is for one time donations.',
      detail: 'Both will get you a spot on the Website & GitHub README. Both services accept PayPal. Make sure to join the Discord for more details.',
    };

    dialog.showMessageBox(null, options).then(result => {
      if (result.response == 0) {
        shell.openExternal('https://liberapay.com/ThatOneCalculator')
      } else if (result.response == 1) {
        shell.openExternal('https://buymeacoffee.com/that1calculator')
      }
    }).catch(err => {
      console.log(err)
    })
  })

});
/**
 * register a button to open in the native browser
 * @param {String} elemid element id
 * @param {String} link the link to go to
 */
function registerLinkToOpenInBrowser(elemid, link) {
  let elem = document.querySelector(`#${elemid}`)

  elem.addEventListener("click", () => {
    shell.openExternal(link)
  })

  faq = document.getElementById("faq-button")
  faq.addEventListener("click", () => { openModal() })
  faq = document.getElementById("closemodal")
  faq.addEventListener("click", () => { closeModal() })
}

function loadPresence(presence, file) {
  document.getElementById("presence-id").value = file.replaceAll(".json", "")
  document.getElementById("presence-name-input").value = presence.name
  document.getElementById("clientid-input").value = presence.clientid
  document.getElementById("del-btn").removeAttribute("disabled")
  document.getElementById("file-btn").removeAttribute("disabled")
  try { bootClientId(presence) } catch (e) { }
}
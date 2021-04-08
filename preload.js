const fs = require('fs');
const os = require('os');
const RPC = require('discord-rpc')
const { dialog, shell, BrowserWindow } = require('@electron/remote')

const dir = `${os.userInfo().homedir}/${process.platform === 'win32' ? '/AppData/Roaming/drpcm/' : '/.config/drpcm/'}`

let clientID = 0
var options = {}
let client = new RPC.Client({ transport: 'ipc' })

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

//check for appdata / linux config dir and make it if it doesen't exist
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

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
        icon: "assets/icon.png",
        timeoutType: "default",
      })
    }
  })
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
      console.log(presence)
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
      inp.classList.remove("danger")
      inp.classList.add("input-success")
    } else {
      inp.classList.remove("input-success")
      inp.classList.add("danger")
    }
  }
}

//what to do when dom loads
document.addEventListener("DOMContentLoaded", () => {
  //load presences
  loadSavedPresences()

  //launch presence
  document.getElementById("test").addEventListener("click", () => {
    //dummy notification
    const myNotification = new Notification("Discord RPC Maker", {
      body: "Your presence has started.",
      icon: "assets/icon.png",
      timeoutType: "default",
    });
    //TODO: start presence
  });

  document.getElementById("new-presence-button").addEventListener("click", () => {
    let wrapper = document.getElementById('presence-scroller')
    let elem = document.createElement('div')
    const content = {
      name: "",
      clientid: "",
      description: "",
      state: "",
      largeimage: "",
      smallimage: "",
      buttons: []
    }

    const data = JSON.stringify(content, null, 2)
    let filename = generateId(10)
    fs.writeFile(`${dir}/${filename}.json`, data, 'utf8', (err) => {
      if (err) { throw err }
      else {
        const myNotification = new Notification("Discord RPC Maker", {
          body: "Your presence has been saved.",
          icon: "assets/icon.png",
          timeoutType: "default",
        })
      }
    })
    html = `
        <div class="presence-list-item">
          <div class="presence-item-title"></div>
          <div class="presence-item-id text secondary">File: ${filename}</div>
          <button class="presence-edit"><i class="fas fa-edit"></i></button>
        </div>
        `
    elem.innerHTML = html
    wrapper.appendChild(elem)
  });

  //save presence
  document.getElementById("save").addEventListener("click", () => {
    saveAsJson()
    reloadPresences()
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
  if (process.platform === "win32") {
    document.querySelector(".zoom").setAttribute("style", "-webkit-text-stroke-width: 0.01em")
  }

  //make links open in new tab
  registerLinkToOpenInBrowser("github-button", "https://github.com/ThatOneCalculator/DiscordRPCMaker")
  registerLinkToOpenInBrowser("discord-button", "https://discord.com/invite/Z7UZPR3bbW")

  document.querySelector('#donate-button').addEventListener("click", () => {
    const options = {
      type: 'question',
      buttons: ['Liberapay', 'BuyMeACoffee', 'Never mind'],
      defaultId: 0,
      title: 'Donate',
      message: 'Thanks for supporting the project! Liberapay is for recurring donations, and BuyMeACoffee is for one time donations.',
      detail: 'Both will get you a spot on the Website & GitHub README. Both services accept PayPal. Make sure to join the Discord for more details.',
    };

    dialog.showMessageBox(null, options, (response, checkboxChecked) => {
      console.log(response);
      console.log(checkboxChecked);
    });
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
}

function loadPresence(presence, file) {
  document.getElementById("presence-id").value = file.replaceAll(".json", "")
  document.getElementById("presence-name-input").value = presence.name
  document.getElementById("clientid-input").value = presence.clientid

  try { bootClientId(presence) } catch (e) { }
}
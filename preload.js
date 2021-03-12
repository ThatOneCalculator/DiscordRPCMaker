const fs = require('fs');
const os = require('os');
const dir = `${os.userInfo().homedir}/${process.platform === 'win32' ? '/AppData/Roaming/drpcm/' : '/.config/drpcm/'}`

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("test").addEventListener("click", () => {
    //alert("Yo")
    const myNotification = new Notification("Discord RPC Maker", {
      body: "Your presence has started.",
      icon: "assets/icon.png",
      timeoutType: "default",
    });
  });

  //clientid enabling
  document.querySelector(".client-id-enabler").addEventListener("keyup", (e) => {
    let inp = document.querySelector(".client-id-enabler")
    let braincell = document.querySelectorAll(".enable-on-clientid")
    if (inp.value !== "" && inp.value.toString().length > 17 && isNaN(parseInt(inp.value)) == false) {
      let options = fetch(`https://discord.com/api/oauth2/applications/${inp.value.toString()}/assets`).then(options => options.json())
      console.log(options)
      braincell.forEach((item, i, arr) => {
        item.removeAttribute("disabled")
      })
    } else {
      braincell.forEach((item, i, arr) => {
        item.disabled = true;
      })
    }
    
  })

  //button enabling
  document.getElementById("button1-enable").addEventListener("change", () => {
    if (document.getElementById("button1-enable").checked) {
      inps = document.querySelector(".button1")
      //inps.classList.add("disabled")
      inps.querySelectorAll('input[disabled]').forEach((item, i, arr) => {
        item.removeAttribute("disabled");
      });
    } else {
      inps = document.querySelector(".button1")
      //inps.classList.remove("disabled")
      inps.querySelectorAll('input[type="text"]').forEach((item, i, arr) => {
        item.setAttribute("disabled", "");
      });
    }
  });

  document.getElementById("button2-enable").addEventListener("change", () => {
    if (document.getElementById("button2-enable").checked) {
      inps = document.querySelector(".button2")
      //inps.classList.add("disabled")
      inps.querySelectorAll('input[disabled]').forEach((item, i, arr) => {
        item.removeAttribute("disabled");
      });
    } else {
      inps = document.querySelector(".button2")
      //inps.classList.remove("disabled")
      inps.querySelectorAll('input[type="text"]').forEach((item, i, arr) => {
        item.setAttribute("disabled", "");
      });
    }
  });

  //fix win outline
  if (process.platform === "win32") {
    document.querySelector(".zoom").setAttribute("style", "-webkit-text-stroke-width: 0.01em")
  }
});

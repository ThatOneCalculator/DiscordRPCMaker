const electron = require('electron');
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.href == "https://discord.com/developers/applications") {
        makeflyout("Go to your desired application, and the ClientID will be detected automatically! ", "drpcm-hint-flyout")
    }
})
document.addEventListener("mousemove", () => {
    let prevflyout = document.querySelector("#drpcm-hint-flyout")
    let clientid = document.querySelector(".code-j7WzRK")
    let fly = document.querySelector("#drpcm-success-flyout")

    if (clientid !== null && fly == null) {
        let id = clientid.innerText
        if (prevflyout !==  null){prevflyout.remove()}
        makeflyout(`
        detected clientID!
        <code style = "font-family: monospace; background: #313131; padding: 5px; border-radius: 5px;">${id}</code>
    `, "drpcm-success-flyout")
    }
})

function makeflyout(html, id) {
    let flyout = document.createElement("div")
        flyout.id = id

        flyout.innerHTML = html + `<button style = "color: white; cursor: pointer; font-weight: bold;" onclick="this.parentElement.style.display = 'none'">&times;</button>`
        flyout.style.position = "absolute"
        flyout.style.zIndex = "999"
        flyout.style.bottom = "0"
        flyout.style.right = "0"
        flyout.style.margin = "1rem"
        flyout.style.background = "#202225"
        flyout.style.borderRadius = "5px"
        flyout.style.padding = "1rem"

        document.body.appendChild(flyout)
}
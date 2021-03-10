document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("test").addEventListener("click", () => {
    //alert("Yo")
    const myNotification = new Notification("Discord RPC Maker", {
      body: "Your presence has started.",
      icon: "assets/icon.png",
      timeoutType: "default",
    });
  });

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
});

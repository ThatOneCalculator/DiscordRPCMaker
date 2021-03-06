document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("test").addEventListener("click", () => {
        //alert("Yo")
        const myNotification = new Notification('Discord RPC Maker', {
          body: 'Your presence has started.',
          icon: 'assets/icon.png'
        })
    })
})

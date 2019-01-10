const ipcRenderer = require('electron').ipcRenderer;

function sendLogin(event) {
    event.preventDefault() // stop the form from submitting
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let creds = {"user":username, "pwd":password}
    ipcRenderer.send('login', creds)
}

ipcRenderer.on('failed-login', (event, arg) => {
    document.getElementById("statusMessage").innerHTML=arg;
});
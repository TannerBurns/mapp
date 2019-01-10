const ipcRenderer = require('electron').ipcRenderer;

function sendLogout(event) {
    event.preventDefault() // stop the form from submitting
    ipcRenderer.send('logout', "")
};
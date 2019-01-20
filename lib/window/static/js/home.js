document.addEventListener("DOMContentLoaded", function() {
    ipcRenderer.send('home-loaded', "True")
});

ipcRenderer.on('clear-player-roster-table', (event, arg) => {
    var table = document.getElementById('player-roster-table');
    while (document.getElementById("player-roster-table").rows.length != 1) {
        table.deleteRow(-1)
    }
});

function pad(val) { return val > 9 ? val : "0" + val; }

ipcRenderer.on('load-player-roster-table', (event, player) => {
    var table = document.getElementById('player-roster-table');

    let row = table.insertRow(-1);
    let id = row.insertCell(0);
    let first = row.insertCell(1);
    let last = row.insertCell(2);
    let playtime = row.insertCell(3);
    let totalSeconds = player.checkedin_time;
    id.innerHTML = `<form class="form-inline my-2 my-lg-0" onSubmit="JavaScript:getPlayer(event, ${player.player_id})"><button id="player-id" class="btn btn-outline-primary my-2 my-sm-0" type="submit">${player.player_id}</button></form>`
    first.innerHTML = player.first
    last.innerHTML = player.last
    var interval = setInterval(function () {
        totalSeconds += 1;
        playtime.innerHTML = `<span id="hour_${player.player_id}">${pad(Math.floor((totalSeconds / 60) / 60 % 60))}<span>:<span id="min_${player.player_id}">${pad(Math.floor(totalSeconds / 60 % 60))}<span>:<span id="sec_${player.player_id}">${pad(parseInt(totalSeconds % 60))}<span>` 
    }, 1000);
});

function getPlayer(event, id) {
    event.preventDefault() // stop the form from submitting
    ipcRenderer.send('load-player-profile', id)
};
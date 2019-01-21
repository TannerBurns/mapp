function search(event) {
    event.preventDefault() // stop the form from submitting
    let query = document.getElementById("search-players").value;
    ipcRenderer.send('search-players', query)
};

function getPlayer(event, id) {
    event.preventDefault() // stop the form from submitting
    ipcRenderer.send('load-player-profile', id)
};

function pad(val) { return val > 9 ? val : "0" + val; }

ipcRenderer.on('load-player-table', (event, player) => {
    var table = document.getElementById('player-table');

    let row = table.insertRow(-1);
    let id = row.insertCell(0);
    let first = row.insertCell(1);
    let last = row.insertCell(2);
    let email = row.insertCell(3);
    let amount = row.insertCell(4);
    let playtime = row.insertCell(5);
    let hour = pad(Math.floor((player.membership.playtime / 60) / 60 % 60));
    let min = pad(Math.floor(player.membership.playtime / 60 % 60));
    let sec = pad(Math.floor(player.membership.playtime % 60));
    id.innerHTML = `<form class="form-inline my-2 my-lg-0" onSubmit="JavaScript:getPlayer(event, ${player.player.id})"><button id="player-id" class="btn btn-outline-primary my-2 my-sm-0" type="submit">${player.player.id}</button></form>`
    first.innerHTML = player.player.first
    last.innerHTML = player.player.last
    email.innerHTML = player.player.email
    amount.innerHTML = player.membership.amount
    playtime.innerHTML = `${hour}:${min}:${sec}`
});

ipcRenderer.on('clear-player-table', (event, arg) => {
    var table = document.getElementById('player-table');
    while (document.getElementById("player-table").rows.length != 1) {
        table.deleteRow(-1)
    }
});
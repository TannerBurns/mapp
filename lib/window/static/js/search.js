function search(event) {
    event.preventDefault() // stop the form from submitting
    let query = document.getElementById("search-players").value;
    if (isNaN(query)) {
        ipcRenderer.send('search-players', query)
    } else {
        ipcRenderer.send('get-player', query)
    }
};

function getPlayer(event, id) {
    event.preventDefault() // stop the form from submitting
    ipcRenderer.send('load-player-profile', id)
};

ipcRenderer.on('load-player-table', (event, arg) => {
    var table = document.getElementById('player-table');
    console.log(document.getElementById("player-table").rows.length)
    /*var i,j;
    for (j = 1; j <= document.getElementById("player-table").rows.length-1; j++) {
        console.log(j)
        table.deleteRow(j)
    }*/

    while (document.getElementById("player-table").rows.length != 1) {
        table.deleteRow(-1)
    }

    for (i = 0; i < arg.length; i++) { 
        let player = arg[i]
        let row = table.insertRow(-1);
        let id = row.insertCell(0);
        let first = row.insertCell(1);
        let last = row.insertCell(2);
        let email = row.insertCell(3);
        id.innerHTML = `<form class="form-inline my-2 my-lg-0" onSubmit="JavaScript:getPlayer(event, ${player.id})"><button id="player-id" class="btn btn-outline-primary my-2 my-sm-0" type="submit">${player.id}</button></form>`
        first.innerHTML = player.first
        last.innerHTML = player.last
        email.innerHTML = player.email
    }
});
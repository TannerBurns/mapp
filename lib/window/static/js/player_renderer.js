const { dialog } = require('electron').remote
var fs = require('fs');

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('select-file').addEventListener('click',function(){
        dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [
                { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
            ]
        }, function (files) {
            if (files !== undefined) {
                getBase64(files[0])
            }
        }); 
    },false);
});

function submitPlayer(event) {
    event.preventDefault()

    let player = {
        first: document.getElementById('firstname').value,
        last: document.getElementById('lastname').value,
        alias: document.getElementById('alias').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        birthday: document.getElementById('birthday').value,
        address: document.getElementById('address').value,
        state: document.getElementById('state').value,
        city: document.getElementById('city').value,
        zip: document.getElementById('zip').value,
        region: document.getElementById('country').value,
        notes: document.getElementById('notes').value,
        referral: (document.getElementById('referral').value === 'true'),
        referred_by: document.getElementById('referredby').value,
        referred_type: document.getElementById('referredtype').value,
        banned: (document.getElementById('banned').value === 'true'),
        picture: document.getElementById("actual-image").value,
    }
    ipcRenderer.send('create-player', player)
}

function getBase64(file) {
    fs.readFile(file, (err, data)=> {
        if (err) throw err;
        if (data.length > 800000){
            document.getElementById('player-image').innerHTML = `<p style="color:red;">Image size is too large!</p>`
        } else {
            let b64image = data.toString('base64')
            document.getElementById('actual-image').value = b64image
            document.getElementById('player-image').innerHTML = `<img style="height:300px;width:300px;" src="data:image/png;base64, ${b64image}"/>`
        }
       
    });
}
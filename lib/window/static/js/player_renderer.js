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
    }
    ipcRenderer.send('create-player', player)
}
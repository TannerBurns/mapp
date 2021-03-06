var interval = null;
var totalSeconds = 0;

document.addEventListener("DOMContentLoaded", function() {
    ipcRenderer.send('player-profile-loaded', "True")
});

ipcRenderer.on('load-player-profile', (event, arg) => {
    document.getElementById('card-b64-image').innerHTML = `<img class="card-img-top" src="data:image/png;base64, ${arg.picture}" alt="Card image"></img>`
    document.getElementById('id').innerHTML = arg.id;
    document.getElementById('firstname').value = arg.first;
    document.getElementById('firstname').readOnly = true;
    document.getElementById('lastname').value = arg.last;
    document.getElementById('lastname').readOnly = true;
    document.getElementById('alias').value = arg.alias;
    document.getElementById('alias').readOnly = true;
    document.getElementById('email').value = arg.email;
    document.getElementById('email').readOnly = true;
    document.getElementById('phone').value = arg.phone;
    document.getElementById('phone').readOnly = true;
    document.getElementById('birthday').value = arg.birthday.replace("T00:00:00Z","");
    document.getElementById('birthday').readOnly = true;
    document.getElementById('joined').value = arg.joined.replace("T00:00:00Z","");
    document.getElementById('joined').readOnly = true;
    document.getElementById('address').value = arg.address;
    document.getElementById('address').readOnly = true;
    document.getElementById('state').value = arg.state;
    document.getElementById('state').readOnly = true;
    document.getElementById('city').value = arg.city;
    document.getElementById('city').readOnly = true;
    document.getElementById('zip').value = arg.zip;
    document.getElementById('zip').readOnly = true;
    var country  = document.getElementById("country");
    var opts = country.options;
    for (var opt, j = 0; opt = opts[j]; j++) {
        if (opt.value == arg.region) {
            country.selectedIndex = j;
            break;
        }
    }
    document.getElementById('country').disabled = true;
    document.getElementById('notes').value = arg.notes;
    document.getElementById('notes').readOnly = true;
    var referral  = document.getElementById("referral");
    var opts = referral.options;
    for (var opt, j = 0; opt = opts[j]; j++) {
        if (arg.referral == false) {
            referral.selectedIndex = 0;
            break;
        } else {
            referral.selectedIndex = 1;
            break;
        }
    }
    document.getElementById('referral').disabled = true;
    document.getElementById('referredby').value = arg.referred_by;
    document.getElementById('referredby').readOnly = true;
    var referredtype  = document.getElementById("referredtype");
    var opts = referredtype.options;
    for (var opt, j = 0; opt = opts[j]; j++) {
        if (opt.value == arg.referred_type) {
            referredtype.selectedIndex = j;
            break;
        }
    }
    document.getElementById('referredtype').disabled = true;
    var banned  = document.getElementById("banned");
    var opts = banned.options;
    for (var opt, j = 0; opt = opts[j]; j++) {
        if (arg.banned == false) {
            banned.selectedIndex = 0;
            break;
        } else {
            banned.selectedIndex = 1;
            break;
        }
    }
    document.getElementById('banned').disabled = true;
    document.getElementById('playtime').readOnly = true;
    document.getElementById('cancel-player-profile').disabled = true;
    document.getElementById('submit-player-profile').disabled = true;
    document.getElementById('cancel-subscription').disabled = true;
    document.getElementById('submit-subscription').disabled = true;
    document.getElementById('add-amount').readOnly = true;
    document.getElementById('payment-type').disabled = true;
    document.getElementById('checkin-player').disabled = false;
    document.getElementById('checkout-player').disabled = true;
});

ipcRenderer.on('load-player-membership', (event, arg) => {
    if (arg.active) {
        document.getElementById("membership").innerHTML = "<p>Member</p>";
    } else {
        document.getElementById("membership").innerHTML = "<p>Non-Member</p>";
    }

    
    document.getElementById('amount').textContent = arg.amount + "$";
    if (arg.playtime > 0) {
        document.getElementById('pt-hour').textContent = pad(Math.floor((arg.playtime / 60) / 60 % 60));
        document.getElementById('pt-min').textContent = pad(Math.floor(arg.playtime / 60 % 60));
        document.getElementById('pt-sec').textContent = pad(Math.floor(arg.playtime % 60));
    } else {
        document.getElementById('pt-hour').textContent = "00";
        document.getElementById('pt-min').textContent = "00";
        document.getElementById('pt-sec').textContent = "00";
    }
   
});

function submitPlayerProfile(event) {
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
    ipcRenderer.send('update-player', player)
};

function updatePlayerProfile(event) {
    event.preventDefault()
    document.getElementById('cancel-player-profile').disabled = false;
    document.getElementById('submit-player-profile').disabled = false;
    document.getElementById('firstname').readOnly = false;
    document.getElementById('lastname').readOnly = false;
    document.getElementById('alias').readOnly = false;
    document.getElementById('email').readOnly = false;
    document.getElementById('phone').readOnly = false;
    document.getElementById('birthday').readOnly = false;
    document.getElementById('address').readOnly = false;
    document.getElementById('state').readOnly = false;
    document.getElementById('city').readOnly = false;
    document.getElementById('zip').readOnly = false;
    document.getElementById('country').disabled = false;
    document.getElementById('notes').readOnly = false;
    document.getElementById('referral').disabled = false;
    document.getElementById('referredby').readOnly = false;
    document.getElementById('referredtype').disabled = false;
    document.getElementById('banned').disabled = false;
};

function updateSubscription(event) {
    event.preventDefault()
    document.getElementById('cancel-subscription').disabled = false;
    document.getElementById('submit-subscription').disabled = false;
    document.getElementById('add-amount').readOnly = false;
    document.getElementById('payment-type').disabled = false;
};

function submitSubscription(event) {
    event.preventDefault()
    let sub = {
        amount: document.getElementById('add-amount').value,
        type: document.getElementById('payment-type').value

    }

    document.getElementById('cancel-subscription').disabled = false;
    document.getElementById('submit-subscription').disabled = false;
    document.getElementById('add-amount').readOnly = false;
    document.getElementById('payment-type').disabled = false;
    var ptype  = document.getElementById("payment-type");
    ptype.selectedIndex = 0;
    document.getElementById('add-amount').value = "";

    ipcRenderer.send('update-subscription', sub)
};

function pad(val) { return val > 9 ? val : "0" + val; }

ipcRenderer.on("player-checkedin", (event, arg) => {
    document.getElementById('checkin-player').disabled = true;
    document.getElementById('checkout-player').disabled = false;
    totalSeconds = arg;
    interval = setInterval(function () {
        totalSeconds += 1;
        document.getElementById("hour").textContent = pad(Math.floor((totalSeconds / 60) / 60 % 60));
        document.getElementById("min").textContent = pad(Math.floor(totalSeconds / 60 % 60));
        document.getElementById("sec").textContent = pad(parseInt(totalSeconds % 60));
    }, 1000);
});

ipcRenderer.on("player-checkedout", (event, arg) => {
    document.getElementById('checkin-player').disabled = false;
    document.getElementById('checkout-player').disabled = true;
    totalSeconds = null; 
    clearInterval(interval);
    document.getElementById("hour").textContent = "00";
    document.getElementById("min").textContent = "00";
    document.getElementById("sec").textContent = "00";
});

function checkin(event) {
    event.preventDefault()
    ipcRenderer.send('checkin-player', null)
};

function checkout(event) {
    event.preventDefault()
    ipcRenderer.send('checkout-player', null)
};

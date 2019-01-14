document.addEventListener("DOMContentLoaded", function() {
    ipcRenderer.send('player-profile-loaded', "True")
});

var Clock = {
    totalSeconds: 0,
  
    start: function (startSeconds) {
      self.totalSeconds = startSeconds;  
      var self = this;
          function pad(val) { return val > 9 ? val : "0" + val; }
      this.interval = setInterval(function () {
        self.totalSeconds += 1;
  
        document.getElementById("hour").text(pad(Math.floor(self.totalSeconds / 60 % 60 % 60)));
        document.getElementById("min").text(pad(Math.floor(self.totalSeconds / 60 % 60)));
        document.getElementById("sec").text(pad(parseInt(self.totalSeconds % 60)));
      }, 1000);
    },
    
    reset: function () {
        Clock.totalSeconds = null; 
      clearInterval(this.interval);
      document.getElementById("hour").text("00")
      document.getElementById("min").text("00");
      document.getElementById("sec").text("00");
    },
    
    pause: function () {
      clearInterval(this.interval);
      delete this.interval;
    },
  
    resume: function () {
      if (!this.interval) this.start();
    },
    
    restart: function () {
         this.reset();
       Clock.start();
    }
};

ipcRenderer.on('load-player-profile', (event, arg) => {
    document.getElementById('id').value = arg.id;
    document.getElementById('id').readOnly = true;
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

    document.getElementById('active').disabled = true;
    document.getElementById('amount').readOnly = true;
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
    var active  = document.getElementById("active");
    var opts = active.options;
    for (var opt, j = 0; opt = opts[j]; j++) {
        if (arg.active == false) {
            active.selectedIndex = 0;
            break;
        } else {
            active.selectedIndex = 1;
            break;
        }
    }
    
    document.getElementById('amount').value = arg.amount;
    document.getElementById('playtime').value = arg.playtime;
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

ipcRenderer.on("player-checkedin", (event, arg) => {
    Clock.start(arg)
});

ipcRenderer.on("player-checkedout", (event, arg) => {
    Clock.reset()
});

function checkin(event) {
    event.preventDefault()
    ipcRenderer.send('checkin-player', null)
    document.getElementById('checkin-player').disabled = true;
    document.getElementById('checkout-player').disabled = false;
};

function checkout(event) {
    event.preventDefault()
    ipcRenderer.send('checkout-player', null)
    document.getElementById('checkin-player').disabled = false;
    document.getElementById('checkout-player').disabled = true;
};

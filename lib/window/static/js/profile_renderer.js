document.addEventListener("DOMContentLoaded", function() {
    ipcRenderer.send('profile-loaded', "True")
});

ipcRenderer.on('load-profile', (event, arg) => {
    document.getElementById('cancel-profile').disabled = true;
    document.getElementById('submit-profile').disabled = true;
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
});

function updateProfile(event) {
    event.preventDefault()
    document.getElementById('cancel-profile').disabled = false;
    document.getElementById('submit-profile').disabled = false;
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
};

function submitProfile(event) {
    event.preventDefault()
    let player = {
        first: document.getElementById('firstname').value,
        last: document.getElementById('lastname').value,
        alias: document.getElementById('alias').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        birthday: document.getElementById('birthday').value,
        joined: document.getElementById('joined').value,
        address: document.getElementById('address').value,
        state: document.getElementById('state').value,
        city: document.getElementById('city').value,
        zip: document.getElementById('zip').value,
        region: document.getElementById('country').value,
        notes: document.getElementById('notes').value,
    }
    ipcRenderer.send('update-employee', player)
}

ipcRenderer.on('load-roles', (event, arg) => {
    document.getElementById('role').value = arg.roles[0].role;
    document.getElementById('role').readOnly = true;
});
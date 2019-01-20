const { app, ipcMain } = require('electron');
var client = require("./lib/client");
var window = require("./lib/window");

ipcMain.on('login', function (event, args) {
    client.login(args.user, args.pwd, function(resp){
        if (resp[0]) {
            client.setToken(resp[1].token)
            client.setEmployeeID(resp[1].employee_id)
            window.Home()
        } else {
            event.sender.send('failed-login', resp[1].error)
        }
    });
    
});

ipcMain.on('logout', function (event, arg) {
    client.setToken("")
    client.setEmployeeID(0)
    window.Logout()
});

ipcMain.on('checkin-player', function (event, arg) {
    client.checkinPlayer(function(resp){
        if (resp[0]) {
            event.sender.send('player-checkedin', resp[1].checkedin_time)
        }
    });
});

ipcMain.on('checkout-player', function (event, arg) {
    client.checkoutPlayer(function(resp){
        if (resp[0]) {
            event.sender.send('player-checkedout', null)
            client.getPlayerMembership( function(resp) {
                if (resp[0]) {
                    event.sender.send('load-player-membership', resp[1])
                }
            });
        };
    });
});

ipcMain.on('profile-loaded', function (event, pwd) {
    client.getEmployee( function(resp) {
        if (resp[0]) {
            event.sender.send('load-profile', resp[1])
            client.getRoles( function(resp) {
                if (resp[0]){
                    event.sender.send('load-roles', resp[1])
                }
            });
        }
    });
});

ipcMain.on('player-profile-loaded', function(event, arg) {
    client.getPlayer( function(resp){
        if (resp[0]) {
            event.sender.send('load-player-profile', resp[1])
            client.getPlayerMembership( function(resp) {
                if (resp[0]) {
                    event.sender.send('load-player-membership', resp[1])
                    client.getRoster( function(resp){
                        if (resp[0]) {
                            if (resp[1].roster) {
                                for (var opt, j = 0; opt = resp[1].roster[j]; j++) {
                                    if (opt.player_id == client.getPlayerID()){
                                        event.sender.send('player-checkedin', opt.checkedin_time);
                                        break;
                                    };
                                };
                            }; 
                        };
                    });
                };
            });
        };
    });
});

ipcMain.on('update-employee', function (event, arg) {
    client.updateEmployee(arg, function(resp) {
        if (resp[0]) {
            client.getEmployee( function(resp) {
                if (resp[0]) {
                    event.sender.send('load-profile', resp[1])
                } 
            });
        }
    });
});

ipcMain.on('update-subscription', function (event, arg) {
    client.addMembershipTime(arg.type, arg.amount, function(resp) {
        if (resp[0]) {
            window.PlayerProfile()
        }
    });
});

ipcMain.on('update-player', function (event, arg) {
    client.updatePlayer(arg, function(resp) {
        if (resp[0]) {
            client.getPlayer( function(resp) {
                if (resp[0]) {
                    window.PlayerProfile()
                } 
            });
        }
    });
});

ipcMain.on('create-player', function (event, arg) {
    client.createPlayer(arg, function(resp) {
        if (resp[0]) {
            client.setPlayerID(resp[1].id);
            client.createMembership({amount:0, notes:""}, function(resp){
                if (resp[0]){
                    window.PlayerProfile()
                }
            });
            
        }
    });
});

ipcMain.on('load-player-profile', function(event, arg){
    client.setPlayerID(arg)
    window.PlayerProfile()
});

ipcMain.on('get-player', function(event, arg) {
    event.sender.send('clear-player-table', null);
    client.setPlayerID(arg)
    client.getPlayer(function(resp) {
        if (resp[0]) {
            event.sender.send('load-player-table', [resp[1]])
        }
    });
});

ipcMain.on('search-players', function(event, arg) {
    event.sender.send('clear-player-table', null);
    client.search(arg.split(" ")[0], arg.split(" ")[1], function(resp) {
        if (resp[0]) {
            for (j=0; j<resp[1].players.length;j++) {
                event.sender.send('load-player-table', resp[1].players[j])
            };
        };
    });
});

ipcMain.on('home-loaded', function (event, pwd) {
    event.sender.send('clear-player-roster-table', null);
    client.getRoster( function(resp) {
        if (resp[0]) {
            if (resp[1].roster) {
                for(i=0; i<resp[1].roster.length;i++) {
                    event.sender.send('load-player-roster-table', resp[1].roster[i])
                }
            };
        };
    });
});

app.on('ready', function(){
    client = new client()
    window = new window()
    window.Login()
});

app.on('window-all-closed', function(){
    app.quit();
});
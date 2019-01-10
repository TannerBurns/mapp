const { BrowserWindow } = require('electron');

module.exports = class MainWindow {
    constructor(){
        this.window = new BrowserWindow({
            show: false,
        })
    } 
    Login(){
        this.window.loadURL(`file://${__dirname}/templates/index.html`);
        this.window.maximize()
        this.window.show()
        this.window.on('closed', function() {
            this.window = null;
        });
    }
    Home(){
        this.window.loadURL(`file://${__dirname}/templates/home.html`);
        this.window.on('closed', function() {          
            this.window = null;
        });
    }
    PlayerProfile(){
        this.window.loadURL(`file://${__dirname}/templates/player_profile.html`);
        this.window.on('closed', function() {          
            this.window = null;
        });
    }
    Logout(){
        this.window.loadURL(`file://${__dirname}/templates/index.html`);
        this.window.on('closed', function() {
            this.window = null;
        });
    }
};
const { app, BrowserWindow, ipcMain } = require('electron');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 550,
        height: 650,
        resizable: false,
        transparent: true,
        frame: false,

        webPreferences: {
            preload: __dirname + '/preload.js',
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    win.loadFile('index.html');
}

app.whenReady().then(createWindow);

ipcMain.on('close-app', () => {
    win.close();
});
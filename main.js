const { app, BrowserWindow } = require('electron')

function createWindow() {
  const win = new BrowserWindow({
    width: 560,
    height: 580,
    resizable: false,
    transparent: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  })

  win.webContents.session.clearCache()
  win.webContents.openDevTools()
  win.loadFile('index.html')
}

app.whenReady().then(createWindow)
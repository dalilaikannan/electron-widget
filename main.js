const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 400,  
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.webContents.openDevTools();

  win.loadFile(path.join(__dirname, 'main.html'));
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

let hi = "hii"
function press() {
    console.log(hi)
}

ipcMain.on('button-pressed', () => {
    press(); 
});


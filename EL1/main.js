const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Load the preload script
      contextIsolation: true, // Secure by isolating context
      enableRemoteModule: false,
      nodeIntegration: false
    }
  });

  // Load React app
  mainWindow.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});


ipcMain.handle('fdc3-broadcast', (event, context) => {
  console.log('Broadcasting context:', context);
  // Logic for broadcasting FDC3 context
  BrowserWindow.getAllWindows().forEach(win => {
   // if (win !== event.sender) { // Don't send it back to the sender
      win.webContents.send('fdc3-context', context);
   // }
  });
  return "success";
});

ipcMain.handle('fdc3-raiseIntent', (event, intent, context) => {
  console.log(`Raising intent ${intent} with context`, context);
  // Logic for handling intents
});

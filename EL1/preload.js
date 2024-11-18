const { contextBridge, ipcRenderer } = require('electron');

// Expose FDC3 API to the renderer
contextBridge.exposeInMainWorld('fdc3', {
  broadcast: (context) => ipcRenderer.invoke('fdc3-broadcast', context),
  raiseIntent: (intent, context) => ipcRenderer.invoke('fdc3-raiseIntent', intent, context),
  addIntentListener: (intent, handler) => {
    ipcRenderer.on(`fdc3-intent-${intent}`, (event, context) => {
      handler(context);
    });
  }
});

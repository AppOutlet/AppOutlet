const { contextBridge, ipcRenderer, shell } = require('electron');
const childProcess = require('child_process');

contextBridge.exposeInMainWorld('electronAPI', {
    invoke: (channel, args) => ipcRenderer.invoke(channel, args),
    openExternalUrl: (url) => shell.openExternal(url),
    getChildProcess: () => childProcess,
});

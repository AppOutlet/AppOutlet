const { ipcMain } = require('electron');

ipcMain.handle('get-uppercase-string', (event, args) => {
    return new Promise((resolve) => {
        console.log('Received', args);
        resolve(args.toUpperCase());
    });
});

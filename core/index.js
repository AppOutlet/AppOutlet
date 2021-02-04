const { ipcMain } = require('electron');

ipcMain.handle(
    'get-uppercase-string',
    (event, args) =>
        new Promise((resolve) => {
            console.log('Received', args);
            resolve(args.toUpperCase());
        }),
);

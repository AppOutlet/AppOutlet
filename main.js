const { app, BrowserWindow } = require('electron');
const path = require('path');
require('./core');

const isDevelopment = process.argv
    .slice(1)
    .some((argument) => argument === '--serve');

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 730,
        minHeight: 680,
        minWidth: 1200,
        title: 'App Outlet',
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    if (isDevelopment) {
        require('electron-reload')(__dirname, {
            electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
        });

        win.loadURL('http://localhost:4200/#/')
            .then(() => {
                console.log('Content loaded on development environment');
            })
            .catch(() => {
                console.error(
                    'Unable to load content on development environment',
                );
            });
    } else {
        win.loadFile(`${__dirname}/dist/app-outlet/index.html`)
            .then(() => {
                console.log('Content loaded');
            })
            .catch(() => {
                console.error('Unable to load content');
            });

        win.setMenuBarVisibility(false);
    }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

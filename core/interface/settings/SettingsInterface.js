const { ipcMain } = require('electron');
const channels = require('../InterfaceChannel');
const settingsService = require('../../service/settings/SettingsService');

ipcMain?.handle(channels.settings.setTheme, (event, args) => {
    return settingsService.setTheme(args[0]);
});

ipcMain?.handle(channels.settings.getTheme, () => {
    return settingsService.getTheme();
});

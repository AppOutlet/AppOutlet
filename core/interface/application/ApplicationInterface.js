const { ipcMain } = require('electron');
const channels = require('../InterfaceChannel');
const applicationService = require('../../service/application/ApplicationService');

ipcMain.handle(channels.application.getRecentlyAdded, () => {
    return applicationService.getRecentlyAdded();
});

ipcMain.handle(channels.application.getRecentlyUpdated, () => {
    return applicationService.getRecentlyUpdated();
});

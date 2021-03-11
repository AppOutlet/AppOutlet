const { ipcMain } = require('electron');
const channels = require('../InterfaceChannel');
const applicationService = require('../../service/application/ApplicationService');

ipcMain?.handle(channels.application.getRecentlyAdded, () => {
    return applicationService.getRecentlyAdded();
});

ipcMain?.handle(channels.application.getRecentlyUpdated, () => {
    return applicationService.getRecentlyUpdated();
});

ipcMain?.handle(channels.application.searchByTerm, (event, args) => {
    return applicationService.searchByTerm(args[0]);
});

ipcMain?.handle(channels.application.findByCreationDate, (event, args) => {
    return applicationService.findByCreationDate(args[0]);
});

ipcMain?.handle(channels.application.findByLastReleaseDate, (event, args) => {
    return applicationService.findByLastReleaseDate(args[0]);
});

ipcMain?.handle(channels.application.findByCategory, (event, args) => {
    return applicationService.findByCategory(args[0]);
});

ipcMain?.handle(channels.application.findById, (event, args) => {
    return applicationService.findById(args[0]);
});

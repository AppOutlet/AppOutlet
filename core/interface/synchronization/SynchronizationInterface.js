const synchronizationService = require('../../service/synchronization/SynchornizationService');
const { ipcMain } = require('electron');
const InterfaceChannel = require('../InterfaceChannel');

let isSynchronizingCache = false;

synchronizationService
    .getSynchronizationStatus()
    .subscribe((isSynchronizing) => {
        if (isSynchronizing) {
            isSynchronizingCache = isSynchronizing;
        }
        ipcMain.emit(
            InterfaceChannel.synchronization.isRunning,
            isSynchronizing,
        );
    });

ipcMain?.handle(InterfaceChannel.synchronization.isRunningSync, () => {
    return isSynchronizingCache;
});

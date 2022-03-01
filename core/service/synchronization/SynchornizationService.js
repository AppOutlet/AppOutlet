const { forkJoin, Subject } = require('rxjs');

const flathubSynchronizer = require('./synchronizer/FlathubSynchronizer');
const appImageHubSynchronizer = require('./synchronizer/AppImageHubSynchronizer');
const settingsService = require('../settings/SettingsService');

const DAY_IN_MILLIS = 1000 * 60 * 60 * 24 * 7;

const isSynchronizationRunning = new Subject();
isSynchronizationRunning.next(false);

async function shouldSynchronize() {
    const now = new Date();
    const lastSync = await settingsService.getLastSynchronizationDate();

    if (lastSync) {
        return now.getTime() - lastSync.getTime() > DAY_IN_MILLIS;
    } else {
        return true;
    }
}

async function startSynchronization() {
    if (await shouldSynchronize()) {
        console.log('Starting synchronization');
        synchronize();
    } else {
        console.log('No need to synchronize');
    }
}

function synchronize() {
    isSynchronizationRunning.next(true);
    forkJoin([
        flathubSynchronizer.startSynchronization(),
        appImageHubSynchronizer.startSynchronization(),
    ]).subscribe(
        () => {
            console.log('Synchronization succeeded');
            settingsService.setLastSynchronizationDate(new Date());
            isSynchronizationRunning.next(false);
        },
        (error) => {
            console.error(error);
            isSynchronizationRunning.next(false);
        },
    );
}

module.exports = {
    startSynchronization,
    getSynchronizationStatus: () => isSynchronizationRunning,
};

const { forkJoin } = require('rxjs');

const flathubSynchronizer = require('./synchronizer/FlathubSynchronizer');
const appImageHubSynchronizer = require('./synchronizer/AppImageHubSynchronizer');
const snapStoreSynchronizer = require('./synchronizer/SnapStoreSynchronizer');
const settingsService = require('../settings/SettingsService');

const DAY_IN_MILLIS = 1000 * 60 * 60 * 24;

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
        synchronize();
    }
}

function synchronize() {
    forkJoin([
        flathubSynchronizer.startSynchronization(),
        appImageHubSynchronizer.startSynchronization(),
        snapStoreSynchronizer.startSynchronization(),
    ]).subscribe(
        () => {
            console.log('Synchronization succeeded');
            settingsService.setLastSynchronizationDate(new Date());
        },
        (error) => {
            console.error(error);
        },
    );
}

module.exports = {
    startSynchronization,
};

const { forkJoin } = require('rxjs');
const log = require('loglevel');

const flathubSynchronizer = require('./synchronizer/FlathubSynchronizer');
const appImageHubSynchronizer = require('./synchronizer/AppImageHubSynchronizer');
const snapStoreSynchronizer = require('./synchronizer/SnapStoreSynchronizer');

function startSynchronization() {
    forkJoin([
        flathubSynchronizer.startSynchronization(),
        appImageHubSynchronizer.startSynchronization(),
        snapStoreSynchronizer.startSynchronization(),
    ]).subscribe(
        () => {
            log.info('Synchronization finished successfully');
        },
        (error) => {
            log.error('Synchronization finished with errors', error);
        },
    );
}

module.exports = {
    startSynchronization,
};

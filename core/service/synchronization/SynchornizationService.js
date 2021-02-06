const flathubSynchronizer = require('./synchronizer/FlathubSynchronizer');

function startSynchronization() {
    flathubSynchronizer.startSynchronization();
}

module.exports = {
    startSynchronization,
};

const settingsRepository = require('../../repository/settings/SettingsRepository');
const SettingsKeys = require('../../model/SettingsKeys');

function getLastSynchronizationDate() {
    return settingsRepository
        .findByKey(SettingsKeys.LAST_SYNC)
        .then((dateString) => new Date(dateString));
}

function setLastSynchronizationDate(date) {
    return settingsRepository.save(SettingsKeys.LAST_SYNC, date.toISOString());
}

module.exports = {
    getLastSynchronizationDate,
    setLastSynchronizationDate,
};

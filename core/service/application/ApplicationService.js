const applicationRepository = require('../../repository/application/ApplicationRepository');

function getRecentlyAdded() {
    return applicationRepository.getRecentlyAdded();
}

function getRecentlyUpdated() {
    return applicationRepository.getRecentlyUpdated();
}

module.exports = {
    getRecentlyAdded,
    getRecentlyUpdated,
};

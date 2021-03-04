const applicationRepository = require('../../repository/application/ApplicationRepository');

function getRecentlyAdded() {
    return applicationRepository.getRecentlyAdded();
}

function getRecentlyUpdated() {
    return applicationRepository.getRecentlyUpdated();
}

function searchByTerm(searchParameters) {
    return applicationRepository.searchByTerm(searchParameters);
}

module.exports = {
    getRecentlyAdded,
    getRecentlyUpdated,
    searchByTerm,
};

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

function findByCreationDate(searchParameters) {
    return applicationRepository.findByCreationDate(searchParameters);
}

function findByLastReleaseDate(searchParameters) {
    return applicationRepository.findByLastReleaseDate(searchParameters);
}

module.exports = {
    getRecentlyAdded,
    getRecentlyUpdated,
    searchByTerm,
    findByCreationDate,
    findByLastReleaseDate,
};

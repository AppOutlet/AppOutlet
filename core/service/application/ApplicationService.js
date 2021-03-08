const applicationRepository = require('../../repository/application/ApplicationRepository');
const tagsService = require('../tags/TagsSevice');

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

function findByCategory(searchParameters) {
    searchParameters.tags = tagsService.getTagsByCategory(
        searchParameters.category,
    );

    return applicationRepository.findByTags(searchParameters);
}

function findById(applicationId) {
    return applicationRepository.findById(applicationId);
}

module.exports = {
    getRecentlyAdded,
    getRecentlyUpdated,
    searchByTerm,
    findByCreationDate,
    findByLastReleaseDate,
    findByCategory,
    findById,
};

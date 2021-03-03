const applicationRepository = require('../../repository/application/ApplicationRepository');

function getRecentlyAdded() {
    return applicationRepository.getRecentlyAdded();
}

module.exports = {
    getRecentlyAdded,
};

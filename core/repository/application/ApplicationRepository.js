const connectionFactory = require('../ConnectionFactory');
const ApplicationEntity = require('../../entity/ApplicationEntity');

function getRepository() {
    return connectionFactory.getRepository(ApplicationEntity);
}

function save(applications) {
    return getRepository().then((repository) =>
        repository.save(applications, { transaction: false }),
    );
}

function getRecentlyAdded() {
    return getRepository().then((repository) =>
        repository.find({ take: 6, orderBy: { creationDate: 'DESC' } }),
    );
}

function getRecentlyUpdated() {
    return getRepository().then((repository) =>
        repository.find({ take: 6, orderBy: { lastReleaseDate: 'DESC' } }),
    );
}

module.exports = {
    save,
    getRecentlyAdded,
    getRecentlyUpdated,
};

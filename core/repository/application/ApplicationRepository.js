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
        repository.find({ take: 6, order: { creationDate: 'DESC' } }),
    );
}

function getRecentlyUpdated() {
    return getRepository().then((repository) =>
        repository.find({ take: 6, order: { lastReleaseDate: 'DESC' } }),
    );
}

function findById(id) {
    return getRepository().then((repository) =>
        repository.findOne({ where: { id } }),
    );
}

module.exports = {
    save,
    getRecentlyAdded,
    getRecentlyUpdated,
    findById,
};

const connectionFactory = require('../ConnectionFactory');
const settingsEntity = require('../../entity/SettingsEntity');
const Settings = require('../../model/Settings');

function getSettingsRepository() {
    return connectionFactory
        .getConnection()
        .then((connection) => connection.getRepository(settingsEntity));
}

function save(key, value) {
    return Promise.all([getSettingsRepository(), findByKey(key)])
        .then(([repository, settings]) => {
            if (settings) {
                settings.value = value;
                return { repository, settings };
            } else {
                return { repository, settings: new Settings(null, key, value) };
            }
        })
        .then(({ repository, settings }) => repository.save(settings));
}

function findByKey(key) {
    return getSettingsRepository().then((repository) =>
        repository.findOne({
            where: {
                key,
            },
        }),
    );
}

module.exports = {
    save,
    findByKey,
};

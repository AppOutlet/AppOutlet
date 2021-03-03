const typeOrm = require('typeorm');
const { homedir } = require('os');

const applicationEntity = require('../entity/ApplicationEntity');
const settingsEntity = require('../entity/SettingsEntity');

const connection = typeOrm.createConnection({
    type: 'sqlite',
    database: `${homedir()}/.config/app-outlet/database/app-outlet.db`,
    synchronize: true,
    logging: true,
    entities: [applicationEntity, settingsEntity],
});

function getRepository(entity) {
    return connection.then((conn) => conn.getRepository(entity));
}

module.exports = {
    getConnection: () => connection,
    getRepository,
};

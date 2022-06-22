const typeOrm = require('typeorm');
const { homedir } = require('os');

const applicationEntity = require('../entity/ApplicationEntity');
const settingsEntity = require('../entity/SettingsEntity');

function getDatabaseFilePath() {
    if (process.env.CI) {
        return `release/app-outlet.db`;
    } else {
        return `${homedir()}/.config/app-outlet/database/app-outlet.db`;
    }
}

const connection = typeOrm.createConnection({
    type: 'sqlite',
    database: getDatabaseFilePath(),
    synchronize: true,
    logging: false,
    entities: [applicationEntity, settingsEntity],
});

function getRepository(entity) {
    return connection.then((conn) => conn.getRepository(entity));
}

module.exports = {
    getConnection: () => connection,
    getRepository,
};

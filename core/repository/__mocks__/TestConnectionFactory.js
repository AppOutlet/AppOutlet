const typeOrm = require('typeorm');

const applicationEntity = require('../../entity/ApplicationEntity');
const settingsEntity = require('../../entity/SettingsEntity');

const connection = typeOrm.createConnection({
    type: 'sqlite',
    database: `:memory:`,
    synchronize: true,
    logging: true,
    entities: [applicationEntity, settingsEntity],
});

module.exports = {
    getConnection: () => connection,
};

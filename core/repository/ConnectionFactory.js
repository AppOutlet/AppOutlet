const typeOrm = require('typeorm');
const { homedir } = require('os');

const applicationEntity = require('../entity/ApplicationEntity');

const connection = typeOrm.createConnection({
    type: 'sqlite',
    database: `${homedir()}/.config/app-outlet/database/app-outlet.db`,
    synchronize: true,
    logging: true,
    entities: [applicationEntity],
});

module.exports = {
    getConnection: () => connection,
};

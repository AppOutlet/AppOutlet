const typeOrm = require('typeorm');

const applicationEntity = require('../entity/ApplicationEntity');

const connection = typeOrm.createConnection({
    type: 'sqlite',
    database: '~/.config/app-outlet/database/app-outlet.db',
    synchronize: true,
    logging: true,
    entities: [applicationEntity],
});

module.exports = {
    getConnection: () => connection,
};

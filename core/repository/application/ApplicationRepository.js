const connectionFactory = require('../ConnectionFactory');

function save(applications) {
    return connectionFactory
        .getConnection()
        .then((connection) => connection.manager)
        .then((manager) => manager.save(applications, { transaction: false }));
}

module.exports = {
    save,
};

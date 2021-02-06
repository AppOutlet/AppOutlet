const connectionFactory = require('../ConnectionFactory');

function save(applications) {
    return connectionFactory
        .getConnection()
        .then((connection) => connection.manager.save(applications));
}

module.exports = {
    save,
};

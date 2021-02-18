const { EntitySchema } = require('typeorm');

const Settings = require('../model/Settings');

const schema = new EntitySchema({
    name: 'Settings',
    target: Settings,
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        key: {
            type: 'varchar',
            nullable: true,
            unique: true,
        },
        value: {
            type: 'varchar',
            nullable: true,
        },
    },
});

module.exports = schema;

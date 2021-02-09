const { EntitySchema } = require('typeorm');

const Application = require('../model/Application');
const arrayToStringTransformer = require('./transformer/ArrayToStringTransformer');
const dateToIntTransformer = require('./transformer/DateToIntTransformer');

module.exports = new EntitySchema({
    name: 'Application',
    target: Application,
    columns: {
        id: {
            primary: true,
            type: 'varchar',
            generated: false,
        },
        name: {
            type: 'varchar',
            nullable: true,
        },
        summary: {
            type: 'varchar',
            nullable: true,
        },
        description: {
            type: 'varchar',
            nullable: true,
        },
        developer: {
            type: 'varchar',
            nullable: true,
        },
        license: {
            type: 'varchar',
            nullable: true,
        },
        homepage: {
            type: 'varchar',
            nullable: true,
        },
        bugtrackerUrl: {
            type: 'varchar',
            nullable: true,
        },
        donationUrl: {
            type: 'varchar',
            nullable: true,
        },
        icon: {
            type: 'varchar',
            nullable: true,
        },
        downloadUrl: {
            type: 'varchar',
            nullable: true,
        },
        version: {
            type: 'varchar',
            nullable: true,
        },
        lastReleaseDate: {
            type: 'int',
            transformer: dateToIntTransformer,
            nullable: true,
        },
        creationDate: {
            type: 'int',
            transformer: dateToIntTransformer,
            nullable: true,
        },
        tags: {
            type: 'varchar',
            transformer: arrayToStringTransformer,
            nullable: true,
        },
        screenshots: {
            type: 'varchar',
            transformer: arrayToStringTransformer,
            nullable: true,
        },
        store: {
            type: 'varchar',
            nullable: true,
        },
        packageType: {
            type: 'varchar',
            nullable: true,
        },
        packageName: {
            type: 'varchar',
            nullable: true,
        },
        confinement: {
            type: 'varchar',
            nullable: true,
        },
        viewCount: {
            type: 'int',
            nullable: true,
        },
    },
});

const { ILike } = require('typeorm');

const connectionFactory = require('../ConnectionFactory');
const ApplicationEntity = require('../../entity/ApplicationEntity');

const HOME_SCREEN_SECTION_LIMIT = 6;
const LISTING_SCREEN_PAGE_SIZE = 30;
const LISTING_SCREEN_FIELDS = ['id', 'name', 'summary', 'icon', 'packageType'];

function getRepository() {
    return connectionFactory.getRepository(ApplicationEntity);
}

function save(applications) {
    return getRepository().then((repository) =>
        repository.save(applications, { transaction: false }),
    );
}

function getRecentlyAdded() {
    return getRepository().then((repository) =>
        repository.find({
            select: LISTING_SCREEN_FIELDS,
            order: { creationDate: 'DESC' },
            take: HOME_SCREEN_SECTION_LIMIT,
        }),
    );
}

function getRecentlyUpdated() {
    return getRepository().then((repository) =>
        repository.find({
            select: LISTING_SCREEN_FIELDS,
            order: { lastReleaseDate: 'DESC' },
            take: HOME_SCREEN_SECTION_LIMIT,
        }),
    );
}

function findById(id) {
    return getRepository().then((repository) =>
        repository.findOne({ where: { id } }),
    );
}

function getPaginationSettings(page) {
    return {
        take: LISTING_SCREEN_PAGE_SIZE,
        skip: (page ?? 0) * LISTING_SCREEN_PAGE_SIZE,
    };
}

function searchByTerm(searchParameters) {
    const findOptions = {
        select: LISTING_SCREEN_FIELDS,
        ...getPaginationSettings(searchParameters.page),
        where: [
            { name: ILike(`%${searchParameters.searchTerm}%`) },
            { summary: ILike(`%${searchParameters.searchTerm}%`) },
            { description: ILike(`%${searchParameters.searchTerm}%`) },
        ],
    };

    return getRepository().then((repository) => repository.find(findOptions));
}

function findByCreationDate(searchParameters) {
    const findOptions = {
        select: LISTING_SCREEN_FIELDS,
        ...getPaginationSettings(searchParameters.page),
        order: { creationDate: 'DESC' },
    };

    return getRepository().then((repository) => repository.find(findOptions));
}

function findByLastReleaseDate(searchParameters) {
    const findOptions = {
        select: LISTING_SCREEN_FIELDS,
        ...getPaginationSettings(searchParameters.page),
        order: { lastReleaseDate: 'DESC' },
    };

    return getRepository().then((repository) => repository.find(findOptions));
}

function findByTags(searchParameters) {
    let where = '';

    searchParameters.tags.forEach((tag, index) => {
        where = `${where} a.tags LIKE '%${tag}%'`;
        if (searchParameters.tags.length - 1 !== index) {
            where = `${where} or`;
        }
    });

    const paginationSettings = getPaginationSettings(searchParameters.page);

    const query = `
    SELECT
        a.id,
        a.name,
        a.packageType,
        a.summary
    FROM
        application a
    WHERE ${where}
    LIMIT ${paginationSettings.take} OFFSET ${paginationSettings.skip}
    `;

    return getRepository().then((repository) => repository.query(query));
}

module.exports = {
    save,
    getRecentlyAdded,
    getRecentlyUpdated,
    findById,
    searchByTerm,
    findByCreationDate,
    findByLastReleaseDate,
    findByTags,
};

const { ILike } = require('typeorm');

const connectionFactory = require('../ConnectionFactory');
const ApplicationEntity = require('../../entity/ApplicationEntity');

const HOME_SCREEN_SECTION_LIMIT = 6;
const LISTING_SCREEN_PAGE_SIZE = 30;
const LISTING_SCREEN_FIELDS = ['id', 'name', 'summary', 'icon'];

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
            take: HOME_SCREEN_SECTION_LIMIT,
            order: { creationDate: 'DESC' },
        }),
    );
}

function getRecentlyUpdated() {
    return getRepository().then((repository) =>
        repository.find({
            select: LISTING_SCREEN_FIELDS,
            take: HOME_SCREEN_SECTION_LIMIT,
            order: { lastReleaseDate: 'DESC' },
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

module.exports = {
    save,
    getRecentlyAdded,
    getRecentlyUpdated,
    findById,
    searchByTerm,
};

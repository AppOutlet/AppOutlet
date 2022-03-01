const snapStoreRepository = require('../../repository/snapstore/SnapStoreRepository');
const applicationRepository = require('../../repository/application/ApplicationRepository');
const Application = require('../../model/Application');
const ApplicationStores = require('../../model/ApplicationStores');
const PackageType = require('../../model/PackageType');

const cachedTerms = [];

function getIconUrl(mediaList) {
    return mediaList?.find((media) => media.type == 'icon')?.url;
}

function getTags(categories) {
    return categories.map((category) => category.name);
}

function getScreenshots(mediaList) {
    return mediaList
        ?.filter((media) => media.type == 'screenshot')
        ?.map((media) => media.url);
}

function convertSnapToAppOutletApplication(snap) {
    return new Application(
        snap['snap-id'],
        snap.snap.title,
        snap.snap.summary,
        snap.snap.description,
        snap.snap.publisher['display-name'],
        snap.snap.license,
        snap.snap.contact,
        null,
        null,
        getIconUrl(snap.snap.media),
        null,
        snap.revision.version,
        null,
        null,
        getTags(snap.snap.categories),
        getScreenshots(snap.snap.media),
        ApplicationStores.SNAP_STORE,
        PackageType.SNAP,
        snap.name,
        snap.revision.confinement,
    );
}

function convertSnapsToAppOutletApplications(snaps) {
    return snaps.map((snap) => convertSnapToAppOutletApplication(snap));
}

function shouldSynchronize(searchTerm) {
    if (cachedTerms.includes(searchTerm)) {
        return false;
    } else {
        cachedTerms.push(searchTerm);
        return true;
    }
}

function synchronizeSnapAppBySearch(searchTerm) {
    if (shouldSynchronize(searchTerm)) {
        return snapStoreRepository
            .getApps(searchTerm)
            .then((snaps) => {
                return convertSnapsToAppOutletApplications(snaps);
            })
            .then((apps) => applicationRepository.save(apps));
    } else {
        return Promise.resolve(true);
    }
}

module.exports = {
    synchronizeSnapAppBySearch,
};

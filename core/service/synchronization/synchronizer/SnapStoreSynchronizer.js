const { from } = require('rxjs');
const { mergeMap, toArray, map, groupBy, filter } = require('rxjs/operators');

const snapStoreRepository = require('../../../repository/snapstore/SnapStoreRepository');
const applicationRepository = require('../../../repository/application/ApplicationRepository');
const Application = require('../../../model/Application');
const ApplicationStores = require('../../../model/ApplicationStores');
const PackageType = require('../../../model/PackageType');

function mapToApplication(snapApp) {
    return new Application(
        snapApp.snap_id,
        snapApp.title,
        snapApp.summary,
        snapApp.description,
        snapApp.developer_name,
        snapApp.license,
        snapApp.website,
        null,
        null,
        snapApp.icon_url,
        snapApp.anon_download_url,
        snapApp.version,
        new Date(snapApp.last_updated),
        new Date(snapApp.date_published),
        null,
        snapApp.screenshot_urls,
        ApplicationStores.SNAP_STORE,
        PackageType.SNAP,
        snapApp.package_name,
        snapApp.confinement,
    );
}

function mergeGroup(group) {
    let result = null;

    group.forEach((app) => {
        if (result) {
            if (
                result.lastReleaseDate.getTime() < app.lastReleaseDate.getTime()
            ) {
                result = app;
            }
        } else {
            result = app;
        }
    });

    return result;
}

function filterApps(application) {
    return (
        application.icon !== undefined &&
        application.icon !== null &&
        application.icon !== ''
    );
}

function startSynchronization() {
    return from(snapStoreRepository.getApps()).pipe(
        mergeMap(from),
        map(mapToApplication),
        groupBy((app) => app.id),
        mergeMap((group) => group.pipe(toArray())),
        map(mergeGroup),
        filter(filterApps),
        toArray(),
        mergeMap(applicationRepository.save),
    );
}

module.exports = {
    startSynchronization,
};

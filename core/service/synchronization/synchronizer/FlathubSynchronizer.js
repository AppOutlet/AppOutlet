const { from } = require('rxjs');
const { mergeMap, toArray, map, onErrorResumeNext } = require('rxjs/operators');
const log = require('loglevel');

const flathubRepository = require('../../../repository/flathub/FlathubRepository');
const applicationRepository = require('../../../repository/application/ApplicationRepository');
const Application = require('../../../model/Application');
const ApplicationStores = require('../../../model/ApplicationStores');
const PackageType = require('../../../model/PackageType');

function mapTags(flathubApplicationCategories) {
    return flathubApplicationCategories?.map((category) =>
        category.name.toLowerCase(),
    );
}

function mapScreenshots(flathubApplicationScreenshots) {
    return flathubApplicationScreenshots?.map(
        (screenshot) => screenshot.imgDesktopUrl,
    );
}

function mapToApplication(flathubApplication) {
    return new Application(
        flathubApplication.flatpakAppId,
        flathubApplication.name,
        flathubApplication.summary,
        flathubApplication.description,
        flathubApplication.developerName,
        flathubApplication.projectLicense,
        flathubApplication.homepageUrl,
        flathubApplication.bugtrackerUrl,
        flathubApplication.donationUrl,
        flathubApplication.iconDesktopUrl,
        flathubApplication.downloadFlatpakRefUrl,
        flathubApplication.currentReleaseVersion,
        new Date(flathubApplication.currentReleaseDate),
        new Date(flathubApplication.inStoreSinceDate),
        mapTags(flathubApplication.categories),
        mapScreenshots(flathubApplication.screenshots),
        ApplicationStores.FLATHUB,
        PackageType.FLATPAK,
        flathubApplication.flatpakAppId,
        null,
    );
}

function startSynchronization() {
    log.info('Starting Flathub Synchronization');
    return from(flathubRepository.getApps()).pipe(
        mergeMap(from),
        mergeMap(flathubRepository.getAppDetails),
        map(mapToApplication),
        onErrorResumeNext(),
        toArray(),
        mergeMap(applicationRepository.save),
        map((result) => {
            log.info('Flathub synchronization finished successfully');
            return result;
        }),
    );
}

module.exports = {
    startSynchronization,
};

const { from } = require('rxjs');
const { mergeMap, map, toArray, filter } = require('rxjs/operators');

const Application = require('../../../model/Application');
const ApplicationStores = require('../../../model/ApplicationStores');
const PackageType = require('../../../model/PackageType');
const appImageHubRepository = require('../../../repository/appimagehub/AppImageHubRepository');
const applicationRepository = require('../../../repository/application/ApplicationRepository');

const LINK_TYPE_GITHUB = 'GitHub';
const GITHUB_HOMEPAGE = 'http://github.com';
const GITHUB_ISSUES_URI = 'issues';
const DEFAULT_AUTHOR_NAME = 'Unknown';
const APP_IMAGE_ICON_BASE_URL =
    'https://gitcdn.xyz/repo/AppImage/appimage.github.io/master/database';
const APP_IMAGE_SCREENSHOT_BASE_URL = 'https://appimage.github.io/database';

function getLink(links, type) {
    return links?.find((link) => link.type === type)?.url;
}

function getHomepage({ links }) {
    const uri = getLink(links, LINK_TYPE_GITHUB);

    if (uri) {
        return `${GITHUB_HOMEPAGE}/${uri}`;
    } else {
        return null;
    }
}

function getDeveloper(appImageHubApplication) {
    return appImageHubApplication.authors?.[0]?.name ?? DEFAULT_AUTHOR_NAME;
}

function getId(appImageHubApplication) {
    const developer = getDeveloper(appImageHubApplication);
    return `${developer}.${appImageHubApplication.name}`;
}

function getBugtrackerUrl(appImageHubApplication) {
    const homepage = getHomepage(appImageHubApplication);

    if (homepage) {
        return `${homepage}/${GITHUB_ISSUES_URI}`;
    } else {
        return null;
    }
}

function getIcon({ icons }) {
    const iconUri = icons?.[0];

    if (iconUri) {
        return `${APP_IMAGE_ICON_BASE_URL}/${iconUri}`;
    } else {
        return null;
    }
}

function getTags({ categories }) {
    return categories
        ?.map((category) => category?.toLowerCase())
        ?.filter((category) => category != null);
}

function getScreenshots({ screenshots }) {
    return screenshots?.map(
        (screenshot) => `${APP_IMAGE_SCREENSHOT_BASE_URL}/${screenshot}`,
    );
}

function mapToApplication(appImageHubApplication) {
    return new Application(
        getId(appImageHubApplication),
        appImageHubApplication.name.replace(/_/g, ' '),
        appImageHubApplication.description,
        appImageHubApplication.description,
        getDeveloper(appImageHubApplication),
        appImageHubApplication.license,
        getHomepage(appImageHubApplication),
        getBugtrackerUrl(appImageHubApplication),
        null,
        getIcon(appImageHubApplication),
        null,
        null,
        null,
        null,
        getTags(appImageHubApplication),
        getScreenshots(appImageHubApplication),
        ApplicationStores.APP_IMAGE_HUB,
        PackageType.APP_IMAGE,
        null,
        null,
    );
}

function filterApps(application) {
    return (
        // Icon validation
        application.icon !== undefined &&
        application.icon !== null &&
        application.icon !== '' &&
        // Developer validation
        application.developer !== undefined &&
        application.developer !== null &&
        application.developer !== '' &&
        application.developer !== DEFAULT_AUTHOR_NAME
    );
}

function startSynchronization() {
    return from(appImageHubRepository.getApps()).pipe(
        mergeMap(from),
        map(mapToApplication),
        filter(filterApps),
        toArray(),
        mergeMap(applicationRepository.save),
    );
}

module.exports = {
    startSynchronization,
};

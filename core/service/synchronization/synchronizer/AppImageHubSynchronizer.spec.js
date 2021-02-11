const Application = require('../../../model/Application');
const ApplicationStore = require('../../../model/ApplicationStores');
const PackageType = require('../../../model/PackageType');

const mockApps = [
    {
        name: 'AKASHA',
        description: 'Akasha platform',
        categories: ['Network'],
        authors: [
            { name: 'AkashaProject', url: 'https://github.com/AkashaProject' },
        ],
        license: 'MIT',
        links: [
            { type: 'GitHub', url: 'AkashaProject/Community' },
            {
                type: 'Download',
                url: 'https://github.com/AkashaProject/Community/releases',
            },
        ],
        icons: ['AKASHA/icons/128x128/akasha.png'],
        screenshots: ['AKASHA/screenshot.png'],
    },
    {
        name: 'AppOutlet',
        description: 'AppOutlet description',
        categories: ['Network', null],
        license: 'MIT',
        icons: ['AKASHA/icons/128x128/akasha.png'],
        screenshots: ['AKASHA/screenshot.png'],
    },
    {
        name: 'App3',
        description: 'Mock app',
        links: [{ type: 'GitHub' }],
        authors: [{ url: 'https://github.com/fakeApps' }],
        license: 'MIT',
    },
];

const mockAppImageHubRepository = {
    getApps: () => Promise.resolve(mockApps),
};

jest.mock(
    '../../../repository/appimagehub/AppImageHubRepository',
    () => mockAppImageHubRepository,
);

jest.mock('../../../repository/application/ApplicationRepository', () => {
    return {
        save: (apps) => Promise.resolve(apps),
    };
});

const appImageHubSynchronizer = require('./AppImageHubSynchronizer');

describe('AppImage hub Synchronizer', () => {
    it('Should map and save applications', (done) => {
        const expected = [
            new Application(
                'AkashaProject.AKASHA',
                'AKASHA',
                'Akasha platform',
                'Akasha platform',
                'AkashaProject',
                'MIT',
                'http://github.com/AkashaProject/Community',
                'http://github.com/AkashaProject/Community/issues',
                null,
                'https://gitcdn.xyz/repo/AppImage/appimage.github.io/master/database/AKASHA/icons/128x128/akasha.png',
                null,
                null,
                null,
                null,
                ['network'],
                ['https://appimage.github.io/database/AKASHA/screenshot.png'],
                ApplicationStore.APP_IMAGE_HUB,
                PackageType.APP_IMAGE,
                null,
                null,
            ),
            new Application(
                'Unknown.AppOutlet',
                'AppOutlet',
                'AppOutlet description',
                'AppOutlet description',
                'Unknown',
                'MIT',
                null,
                null,
                null,
                'https://gitcdn.xyz/repo/AppImage/appimage.github.io/master/database/AKASHA/icons/128x128/akasha.png',
                null,
                null,
                null,
                null,
                ['network'],
                ['https://appimage.github.io/database/AKASHA/screenshot.png'],
                ApplicationStore.APP_IMAGE_HUB,
                PackageType.APP_IMAGE,
                null,
                null,
            ),
            new Application(
                'Unknown.App3',
                'App3',
                'Mock app',
                'Mock app',
                'Unknown',
                'MIT',
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                undefined,
                undefined,
                ApplicationStore.APP_IMAGE_HUB,
                PackageType.APP_IMAGE,
                null,
                null,
            ),
        ];

        appImageHubSynchronizer.startSynchronization().subscribe((result) => {
            expect(result).toEqual(expected);
            done();
        });
    });
});

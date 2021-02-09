const Application = require('../../../model/Application');
const PackageType = require('../../../model/PackageType');
const ApplicationStores = require('../../../model/ApplicationStores');

const mockApps = [
    {
        flatpakAppId: 'com.spotify.Client',
        name: 'Spotify',
        categories: [{ name: 'Music' }, { name: 'media' }],
        screenshots: [{ imgDesktopUrl: 'http://url.com/img.png' }],
        currentReleaseDate: '2021-02-09',
        inStoreSinceDate: '2020-02-09',
    },
    {
        flatpakAppId: 'com.microsoft.Teams',
        name: 'Microsoft Teams',
        currentReleaseDate: '2021-02-09',
        inStoreSinceDate: '2020-02-09',
    },
];

const mockFlathubRepository = {
    getApps: () => Promise.resolve(mockApps),
    getAppDetails: (app) => {
        return Promise.resolve(app);
    },
};

const mockApplicationRepository = {
    save: (app) => {
        return Promise.resolve(app);
    },
};

jest.mock(
    '../../../repository/flathub/FlathubRepository',
    () => mockFlathubRepository,
);

jest.mock(
    '../../../repository/application/ApplicationRepository',
    () => mockApplicationRepository,
);

const flathubSynchronizer = require('./FlathubSynchronizer');

describe('Flathub synchronizer', () => {
    it('Should synchronize apps', (done) => {
        const app = new Application();
        app.id = 'com.spotify.Client';
        app.name = 'Spotify';
        app.tags = ['music', 'media'];
        app.screenshots = ['http://url.com/img.png'];
        app.confinement = null;
        app.creationDate = new Date('2020-02-09');
        app.lastReleaseDate = new Date('2021-02-09');
        app.packageName = 'com.spotify.Client';
        app.packageType = PackageType.FLATPAK;
        app.store = ApplicationStores.FLATHUB;

        const app2 = new Application();
        app2.id = 'com.microsoft.Teams';
        app2.name = 'Microsoft Teams';
        app2.confinement = null;
        app2.creationDate = new Date('2020-02-09');
        app2.lastReleaseDate = new Date('2021-02-09');
        app2.packageName = 'com.microsoft.Teams';
        app2.packageType = PackageType.FLATPAK;
        app2.store = ApplicationStores.FLATHUB;

        const expected = [app, app2];

        flathubSynchronizer.startSynchronization().subscribe((result) => {
            expect(result).toEqual(expected);
            done();
        });
    });
});

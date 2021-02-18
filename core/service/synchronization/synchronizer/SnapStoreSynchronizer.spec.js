const Application = require('../../../model/Application');
const ApplicationStores = require('../../../model/ApplicationStores');
const PackageType = require('../../../model/PackageType');

const mockApps = [
    {
        snap_id: '78fg7as67gf5as',
        title: 'My amazing application',
        summary: 'My amazing summary',
        description: 'My amazing description',
        developer_name: 'App Outlet Team',
        license: 'MIT',
        website: 'http://myapp.com',
        icon_url: 'http://myapp.com',
        anon_download_url: 'http://myapp.com',
        version: '1.0',
        last_updated: '2021-02-18 12:12:12',
        date_published: '2021-02-18 12:12:12',
        screenshot_urls: ['http://myapp.com'],
        package_name: 'my-app',
        confinement: 'strict',
    },
    {
        snap_id: '78fg7as67gf5as',
        title: 'My amazing application',
        summary: 'My amazing summary',
        description: 'My amazing description',
        developer_name: 'App Outlet Team',
        license: 'MIT',
        website: 'http://myapp.com',
        icon_url: 'http://myapp.com',
        anon_download_url: 'http://myapp.com',
        version: '1.0',
        last_updated: '2020-02-18 12:12:12',
        date_published: '2021-02-18 12:12:12',
        screenshot_urls: ['http://myapp.com'],
        package_name: 'my-app',
        confinement: 'strict',
    },
    {
        snap_id: 'd7a6sd76as6as6d5as',
        title: 'My amazing application',
        summary: 'My amazing summary',
        description: 'My amazing description',
        developer_name: 'App Outlet Team',
        license: 'MIT',
        website: 'http://myapp.com',
        icon_url: 'http://myapp.com',
        anon_download_url: 'http://myapp.com',
        version: '1.0',
        last_updated: '2020-02-18 12:12:12',
        date_published: '2021-02-18 12:12:12',
        screenshot_urls: ['http://myapp.com'],
        package_name: 'my-app',
        confinement: 'strict',
    },
    {
        snap_id: 'd7a6sd76as6as6d5as',
        title: 'My amazing application',
        summary: 'My amazing summary',
        description: 'My amazing description',
        developer_name: 'App Outlet Team',
        license: 'MIT',
        website: 'http://myapp.com',
        icon_url: 'http://myapp.com',
        anon_download_url: 'http://myapp.com',
        version: '1.0',
        last_updated: '2021-02-18 12:12:12',
        date_published: '2021-02-18 12:12:12',
        screenshot_urls: ['http://myapp.com'],
        package_name: 'my-app',
        confinement: 'strict',
    },
];

const mockSnapStoreRepository = {
    getApps: () => Promise.resolve(mockApps),
};

// TODO: Verify why the debugger gets here two times
const mockApplicationRepository = {
    save: (apps) => Promise.resolve(apps),
};

jest.mock(
    '../../../repository/snapstore/SnapStoreRepository',
    () => mockSnapStoreRepository,
);

jest.mock(
    '../../../repository/application/ApplicationRepository',
    () => mockApplicationRepository,
);

const snapStoreSynchronizer = require('./SnapStoreSynchronizer');

describe('Snap Store Synchronizer', () => {
    it('should import snap applications', (done) => {
        const expectedApps = [
            new Application(
                '78fg7as67gf5as',
                'My amazing application',
                'My amazing summary',
                'My amazing description',
                'App Outlet Team',
                'MIT',
                'http://myapp.com',
                null,
                null,
                'http://myapp.com',
                'http://myapp.com',
                '1.0',
                new Date('2021-02-18 12:12:12'),
                new Date('2021-02-18 12:12:12'),
                null,
                ['http://myapp.com'],
                ApplicationStores.SNAP_STORE,
                PackageType.SNAP,
                'my-app',
                'strict',
            ),
            new Application(
                'd7a6sd76as6as6d5as',
                'My amazing application',
                'My amazing summary',
                'My amazing description',
                'App Outlet Team',
                'MIT',
                'http://myapp.com',
                null,
                null,
                'http://myapp.com',
                'http://myapp.com',
                '1.0',
                new Date('2021-02-18 12:12:12'),
                new Date('2021-02-18 12:12:12'),
                null,
                ['http://myapp.com'],
                ApplicationStores.SNAP_STORE,
                PackageType.SNAP,
                'my-app',
                'strict',
            ),
        ];

        snapStoreSynchronizer.startSynchronization().subscribe((apps) => {
            expect(apps).toEqual(expectedApps);
            done();
        });
    });
});

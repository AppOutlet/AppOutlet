const Application = require('../../model/Application');

const testConnectionFactory = require('../__mocks__/TestConnectionFactory');

jest.mock('uuid', () => 'eb7b7961-395d-4b4c-afc6-9ebcadaf0150');
jest.mock('../ConnectionFactory', () => testConnectionFactory);

describe('Application repository', () => {
    const applicationRepository = require('./ApplicationRepository');

    afterEach(async () => {
        const connection = await testConnectionFactory.getConnection();
        await connection.query('delete from Application');
    });

    it('should save one application', async () => {
        const app = new Application('12312', 'Applications to save');

        await applicationRepository.save(app);

        const savedApp = await applicationRepository.findById(app.id);

        expect(savedApp).toEqual(app);
    });

    it('should save more than one application', async () => {
        const apps = [
            new Application('1', 'Applications to save'),
            new Application('2', 'Applications to save'),
            new Application('3', 'Applications to save'),
        ];

        await applicationRepository.save(apps);

        const app0 = await applicationRepository.findById(apps[0].id);
        const app1 = await applicationRepository.findById(apps[1].id);
        const app2 = await applicationRepository.findById(apps[2].id);

        expect(app0).toEqual(apps[0]);
        expect(app1).toEqual(apps[1]);
        expect(app2).toEqual(apps[2]);
    });

    it('should get recently added apps', async () => {
        const app1 = new Application('1', 'Applications to save');
        app1.creationDate = new Date('2020-01-01 12:12:12');

        const app2 = new Application('2', 'Applications to save');
        app2.creationDate = new Date('2020-01-03 12:12:12');

        const app3 = new Application('3', 'Applications to save');
        app3.creationDate = new Date('2020-01-02 12:12:12');

        const apps = [app1, app2, app3];

        await applicationRepository.save(apps);

        const sortedApps = await applicationRepository.getRecentlyAdded();

        expect(sortedApps.map((app) => app.id)).toEqual(
            [app2, app3, app1].map((app) => app.id),
        );
    });

    it('should get recently updated apps', async () => {
        const app1 = new Application('1');
        app1.lastReleaseDate = new Date('2020-01-01 12:12:12');

        const app2 = new Application('2');
        app2.lastReleaseDate = new Date('2020-01-03 12:12:12');

        const app3 = new Application('3');
        app3.lastReleaseDate = new Date('2020-01-02 12:12:12');

        const apps = [app1, app2, app3];

        await applicationRepository.save(apps);

        const sortedApps = await applicationRepository.getRecentlyUpdated();

        expect(sortedApps.map((app) => app.id)).toEqual(
            [app2, app3, app1].map((app) => app.id),
        );
    });

    it('should search by term', async () => {
        const app1 = new Application('1', 'A', 'B', 'C');

        const app2 = new Application('2', 'D', 'A', 'F');

        const app3 = new Application('3', 'G', 'H', 'A');

        const apps = [app1, app2, app3];

        await applicationRepository.save(apps);

        const aApps = await applicationRepository.searchByTerm({
            searchTerm: 'a',
        });

        const bApps = await applicationRepository.searchByTerm({
            searchTerm: 'B',
        });

        const cApps = await applicationRepository.searchByTerm({
            searchTerm: 'C',
        });

        const gApps = await applicationRepository.searchByTerm({
            searchTerm: 'G',
        });

        expect(aApps.apps.map((app) => app.id)).toEqual(
            apps.map((app) => app.id),
        );
        expect(bApps.apps[0].id).toEqual(app1.id);
        expect(cApps.apps[0].id).toEqual(app1.id);
        expect(gApps.apps[0].id).toEqual(app3.id);
    });

    it('should find by creation date', (done) => {
        const app1 = new Application('1', 'Applications to save');
        app1.creationDate = new Date('2020-01-01 12:12:12');

        const app2 = new Application('2', 'Applications to save');
        app2.creationDate = new Date('2020-01-03 12:12:12');

        const app3 = new Application('3', 'Applications to save');
        app3.creationDate = new Date('2020-01-02 12:12:12');

        const apps = [app1, app2, app3];

        applicationRepository
            .save(apps)
            .then(() =>
                applicationRepository.findByCreationDate({
                    page: 0,
                }),
            )
            .then((sortedApps) => {
                expect(sortedApps.map((app) => app.id)).toEqual(
                    [app2, app3, app1].map((app) => app.id),
                );
                done();
            });
    });

    it('should find by last release date', (done) => {
        const app1 = new Application('1', 'Applications to save');
        app1.lastReleaseDate = new Date('2020-01-01 12:12:12');

        const app2 = new Application('2', 'Applications to save');
        app2.lastReleaseDate = new Date('2020-01-03 12:12:12');

        const app3 = new Application('3', 'Applications to save');
        app3.lastReleaseDate = new Date('2020-01-02 12:12:12');

        const apps = [app1, app2, app3];

        applicationRepository
            .save(apps)
            .then(() =>
                applicationRepository.findByLastReleaseDate({
                    page: 0,
                }),
            )
            .then((sortedApps) => {
                expect(sortedApps.map((app) => app.id)).toEqual(
                    [app2, app3, app1].map((app) => app.id),
                );
                done();
            });
    });

    it('should find by tags', async () => {
        const app1 = new Application('1', 'App1');
        app1.tags = ['video'];

        const app2 = new Application('2', 'App2');
        app2.tags = ['video', 'audio'];

        const apps = [app1, app2];

        await applicationRepository.save(apps);

        const videoApps = await applicationRepository.findByTags({
            page: 0,
            tags: ['video'],
        });

        const audioApps = await applicationRepository.findByTags({
            page: 0,
            tags: ['audio'],
        });

        const allApps = await applicationRepository.findByTags({
            page: 0,
            tags: ['audio', 'video'],
        });

        expect(videoApps.apps.map((app) => app.id)).toEqual(
            [app1, app2].map((app) => app.id),
        );

        expect(audioApps.apps.map((app) => app.id)).toEqual(
            [app2].map((app) => app.id),
        );

        expect(allApps.apps.map((app) => app.id)).toEqual(
            [app1, app2].map((app) => app.id),
        );
    });
});

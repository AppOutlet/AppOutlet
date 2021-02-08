const { Application } = require('../../model/Application');

const mockConnection = {
    manager: {
        save: jest.fn(),
    },
};

const mockConnectionFactory = {
    getConnection: () => Promise.resolve(mockConnection),
};

jest.mock('../ConnectionFactory', () => mockConnectionFactory);

describe('Application repository', () => {
    const applicationRepository = require('./ApplicationRepository');

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should save one application', async () => {
        const app = new Application('12312', 'Applications to save');

        await applicationRepository.save(app);

        expect(mockConnection.manager.save.mock.calls[0][0]).toEqual(app);
    });

    it('Should save more than one application', async () => {
        const apps = [
            new Application('1', 'Applications to save'),
            new Application('2', 'Applications to save'),
            new Application('3', 'Applications to save'),
        ];

        await applicationRepository.save(apps);

        expect(mockConnection.manager.save.mock.calls[0][0]).toEqual(apps);
    });
});

describe('connection factory', () => {
    const mockConnection = {
        getRepository: jest.fn(),
    };

    const mockTypeOrm = {
        createConnection: () => Promise.resolve(mockConnection),
    };
    jest.mock('typeorm', () => mockTypeOrm);

    const mockOs = {
        homedir: jest.fn(),
    };
    jest.mock('os', () => mockOs);

    jest.mock('../entity/ApplicationEntity', () => undefined);
    jest.mock('../entity/SettingsEntity', () => undefined);

    const connectionFactory = require('./ConnectionFactory');

    it('should get connection', async () => {
        const connection = await connectionFactory.getConnection();
        expect(connection).toEqual(mockConnection);
    });

    it('should get repository', async () => {
        const mockRepo = { id: 'mock repo' };
        mockConnection.getRepository.mockReturnValue(mockRepo);
        const repository = await connectionFactory.getRepository();
        expect(repository).toEqual(mockRepo);
    });
});

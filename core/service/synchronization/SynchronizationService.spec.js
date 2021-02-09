const { of, throwError } = require('rxjs');

const mockLogLevel = {
    info: jest.fn(),
    error: jest.fn(),
};

const mockFlathubSynchronizer = {
    startSynchronization: jest.fn(),
};

jest.mock('loglevel', () => mockLogLevel);
jest.mock('./synchronizer/FlathubSynchronizer', () => mockFlathubSynchronizer);

const synchronizationService = require('./SynchornizationService');

describe('Synchronization service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should log info when the synchronization succeed', () => {
        mockFlathubSynchronizer.startSynchronization.mockReturnValueOnce(
            of(true),
        );

        synchronizationService.startSynchronization();

        expect(mockLogLevel.info.mock.calls.length).toBe(1);
        expect(mockLogLevel.error.mock.calls.length).toBe(0);
    });

    it('Should log error when the synchronization fails', () => {
        mockFlathubSynchronizer.startSynchronization.mockReturnValueOnce(
            throwError('err'),
        );

        synchronizationService.startSynchronization();

        expect(mockLogLevel.info.mock.calls.length).toBe(0);
        expect(mockLogLevel.error.mock.calls.length).toBe(1);
    });
});

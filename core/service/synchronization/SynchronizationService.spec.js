const { of, throwError } = require('rxjs');

const mockLogLevel = {
    info: jest.fn(),
    error: jest.fn(),
};

const mockFlathubSynchronizer = {
    startSynchronization: jest.fn(),
};

const mockAppImageHubSynchronizer = {
    startSynchronization: jest.fn(),
};

const mockSnapStoreSynchronizer = {
    startSynchronization: jest.fn(),
};

jest.mock('loglevel', () => mockLogLevel);
jest.mock('./synchronizer/FlathubSynchronizer', () => mockFlathubSynchronizer);
jest.mock(
    './synchronizer/AppImageHubSynchronizer',
    () => mockAppImageHubSynchronizer,
);
jest.mock(
    './synchronizer/SnapStoreSynchronizer',
    () => mockSnapStoreSynchronizer,
);

const synchronizationService = require('./SynchornizationService');

describe('Synchronization service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should log info when the synchronization succeed', () => {
        mockFlathubSynchronizer.startSynchronization.mockReturnValueOnce(
            of(true),
        );

        mockAppImageHubSynchronizer.startSynchronization.mockReturnValueOnce(
            of(true),
        );

        mockSnapStoreSynchronizer.startSynchronization.mockReturnValueOnce(
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

        mockAppImageHubSynchronizer.startSynchronization.mockReturnValueOnce(
            throwError('err'),
        );

        mockSnapStoreSynchronizer.startSynchronization.mockReturnValueOnce(
            throwError('err'),
        );

        synchronizationService.startSynchronization();

        expect(mockLogLevel.info.mock.calls.length).toBe(0);
        expect(mockLogLevel.error.mock.calls.length).toBe(1);
        expect(mockLogLevel.error.mock.calls[0][1]).toEqual('err');
    });
});

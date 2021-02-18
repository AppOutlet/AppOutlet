const { of, throwError } = require('rxjs');

const ONE_HOUR = 1000 * 60 * 60;

const mockFlathubSynchronizer = {
    startSynchronization: jest.fn(),
};

const mockAppImageHubSynchronizer = {
    startSynchronization: jest.fn(),
};

const mockSnapStoreSynchronizer = {
    startSynchronization: jest.fn(),
};

const mockSettingsService = {
    getLastSynchronizationDate: jest.fn(),
    setLastSynchronizationDate: jest.fn(),
};

jest.mock('./synchronizer/FlathubSynchronizer', () => mockFlathubSynchronizer);
jest.mock(
    './synchronizer/AppImageHubSynchronizer',
    () => mockAppImageHubSynchronizer,
);
jest.mock(
    './synchronizer/SnapStoreSynchronizer',
    () => mockSnapStoreSynchronizer,
);

jest.mock('../settings/SettingsService', () => mockSettingsService);

const synchronizationService = require('./SynchornizationService');

describe('Synchronization service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should log info when the synchronization succeed', async () => {
        mockSettingsService.getLastSynchronizationDate.mockReturnValue(
            new Date('1970-01-01'),
        );

        mockFlathubSynchronizer.startSynchronization.mockReturnValueOnce(
            of(true),
        );

        mockAppImageHubSynchronizer.startSynchronization.mockReturnValueOnce(
            of(true),
        );

        mockSnapStoreSynchronizer.startSynchronization.mockReturnValueOnce(
            of(true),
        );

        await synchronizationService.startSynchronization();

        expect(
            mockSettingsService.setLastSynchronizationDate.mock.calls.length,
        ).toBe(1);
    });

    it('Should log error when the synchronization fails', async () => {
        mockSettingsService.getLastSynchronizationDate.mockReturnValue(
            new Date('1970-01-01'),
        );

        mockFlathubSynchronizer.startSynchronization.mockReturnValueOnce(
            throwError('err'),
        );

        mockAppImageHubSynchronizer.startSynchronization.mockReturnValueOnce(
            throwError('err'),
        );

        mockSnapStoreSynchronizer.startSynchronization.mockReturnValueOnce(
            throwError('err'),
        );

        await synchronizationService.startSynchronization();

        expect(
            mockSettingsService.setLastSynchronizationDate.mock.calls.length,
        ).toBe(0);
    });

    function getDateBetweenYesterdayAndNow() {
        const now = new Date().getTime();
        return new Date(now - ONE_HOUR);
    }

    it('Should not synchronize if the last synchronization was newer than yesterday', async () => {
        mockSettingsService.getLastSynchronizationDate.mockReturnValue(
            getDateBetweenYesterdayAndNow(),
        );

        await synchronizationService.startSynchronization();

        expect(
            mockSettingsService.setLastSynchronizationDate.mock.calls.length,
        ).toBe(0);
    });

    it('Should synchronize if the synchronization was never ran', async () => {
        mockSettingsService.getLastSynchronizationDate.mockReturnValue(
            Promise.resolve(null),
        );

        mockFlathubSynchronizer.startSynchronization.mockReturnValueOnce(
            of(true),
        );

        mockAppImageHubSynchronizer.startSynchronization.mockReturnValueOnce(
            of(true),
        );

        mockSnapStoreSynchronizer.startSynchronization.mockReturnValueOnce(
            of(true),
        );

        await synchronizationService.startSynchronization();

        expect(
            mockSettingsService.setLastSynchronizationDate.mock.calls.length,
        ).toBe(1);
    });
});

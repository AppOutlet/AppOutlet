describe('Settings Service', () => {
    const mockSettingsRepository = {
        findByKey: jest.fn(),
        save: jest.fn(),
    };
    jest.mock(
        '../../repository/settings/SettingsRepository',
        () => mockSettingsRepository,
    );

    afterEach(() => {
        jest.clearAllMocks();
    });

    const SettingsKeys = require('../../model/SettingsKeys');
    const settingsService = require('./SettingsService');

    it('should get last synchronization date', async () => {
        const date = new Date();
        const dateString = date.toISOString();
        mockSettingsRepository.findByKey.mockReturnValue(
            Promise.resolve({ value: dateString }),
        );

        const result = await settingsService.getLastSynchronizationDate();

        expect(result.getTime()).toBe(date.getTime());
    });

    it('should return null when last synchronization date is undefined', async () => {
        mockSettingsRepository.findByKey.mockReturnValue(
            Promise.resolve(undefined),
        );

        const result = await settingsService.getLastSynchronizationDate();

        expect(result).toBeNull();
    });

    it('should set last synchronization date', () => {
        const date = new Date();
        settingsService.setLastSynchronizationDate(date);

        expect(mockSettingsRepository.save.mock.calls[0][0]).toEqual(
            SettingsKeys.LAST_SYNC,
        );
        expect(mockSettingsRepository.save.mock.calls[0][1]).toEqual(
            date.toISOString(),
        );
    });

    it('should set theme', () => {
        const theme = 'cosmic';
        settingsService.setTheme(theme);

        expect(mockSettingsRepository.save.mock.calls[0][0]).toEqual(
            SettingsKeys.THEME,
        );
        expect(mockSettingsRepository.save.mock.calls[0][1]).toEqual(theme);
    });

    it('should get theme', async () => {
        const theme = 'cosmic';
        mockSettingsRepository.findByKey.mockReturnValue(
            Promise.resolve({ value: theme }),
        );

        const result = await settingsService.getTheme(theme);

        expect(result.value).toEqual(theme);
    });
});

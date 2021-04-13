const channels = require('../InterfaceChannel');

describe('Settings Interface', () => {
    const handleAux = {};

    const mockIpcMain = {
        handle: (channel, callback) => {
            handleAux[channel] = callback;
        },
    };

    const mockSettingsService = {
        getTheme: jest.fn(),
        setTheme: jest.fn(),
    };

    jest.mock('electron', () => {
        return { ipcMain: mockIpcMain };
    });

    jest.mock(
        '../../service/settings/SettingsService',
        () => mockSettingsService,
    );

    require('./SettingsInterface');

    it('should handle getTheme request', () => {
        const callback = handleAux[channels.settings.getTheme];
        expect(callback).toBeDefined();
        callback();
        expect(mockSettingsService.getTheme.mock.calls.length).toBe(1);
    });

    it('should handle setTheme request', () => {
        const theme = 'cosmic';
        const callback = handleAux[channels.settings.setTheme];
        expect(callback).toBeDefined();
        callback(undefined, [theme]);
        expect(mockSettingsService.setTheme.mock.calls.length).toBe(1);
        expect(mockSettingsService.setTheme.mock.calls[0][0]).toEqual(theme);
    });
});

describe('settings interface on non electron environment', () => {
    jest.mock('electron', () => {
        return { ipcMain: undefined };
    });
    jest.mock('../InterfaceChannel', () => null);
    jest.mock('../../service/settings/SettingsService', () => null);

    const { ipcMain } = require('./SettingsInterface');

    it('should not throw error', () => {
        expect(ipcMain).toBeUndefined();
    });
});

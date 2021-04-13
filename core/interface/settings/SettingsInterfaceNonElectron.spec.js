describe('settings interface on non electron environment', () => {
    jest.mock('electron', () => {
        return { ipcMain: undefined };
    });

    const { ipcMain } = require('./SettingsInterface');

    it('should not throw error', () => {
        expect(ipcMain).toBeUndefined();
    });
});

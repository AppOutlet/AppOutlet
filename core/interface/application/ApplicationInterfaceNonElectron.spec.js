describe('application interface on non electron environment', () => {
    jest.mock('electron', () => {
        return { ipcMain: undefined };
    });

    const { ipcMain } = require('./ApplicationInterface');

    it('should not throw error', () => {
        expect(ipcMain).toBeUndefined();
    });
});

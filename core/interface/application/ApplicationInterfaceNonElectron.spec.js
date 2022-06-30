describe('application interface on non electron environment', () => {
    jest.mock('electron', () => {
        return { ipcMain: undefined };
    });

    jest.mock('../InterfaceChannel', () => null);
    jest.mock('../../service/application/ApplicationService', () => null);

    const { ipcMain } = require('./ApplicationInterface');

    it('should not throw error', () => {
        expect(ipcMain).toBeUndefined();
    });
});

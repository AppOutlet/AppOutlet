describe('application interface', () => {
    const handleAux = {};
    const mockIpcMain = {
        handle: (channel, callback) => {
            handleAux[channel] = callback;
        },
    };

    jest.mock('electron', () => {
        return { ipcMain: mockIpcMain };
    });

    require('./ApplicationInterface');

    it('should handle show recently added request', () => {
        console.log(handleAux);
    });
});

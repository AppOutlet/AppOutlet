const channels = require('../InterfaceChannel');

describe('application interface', () => {
    const handleAux = {};

    const mockIpcMain = {
        handle: (channel, callback) => {
            handleAux[channel] = callback;
        },
    };

    const mockApplicationService = {
        getRecentlyAdded: jest.fn(),
        getRecentlyUpdated: jest.fn(),
        searchByTerm: jest.fn(),
        findByCreationDate: jest.fn(),
        findByLastReleaseDate: jest.fn(),
        findByCategory: jest.fn(),
        findById: jest.fn(),
        save: jest.fn(),
    };

    jest.mock('electron', () => {
        return { ipcMain: mockIpcMain };
    });

    jest.mock(
        '../../service/application/ApplicationService',
        () => mockApplicationService,
    );

    require('./ApplicationInterface');

    it('should handle show recently added request', () => {
        const callback = handleAux[channels.application.getRecentlyAdded];
        expect(callback).toBeDefined();
        callback();
        expect(mockApplicationService.getRecentlyAdded.mock.calls.length).toBe(
            1,
        );
    });

    it('should handle show recently updated request', () => {
        const callback = handleAux[channels.application.getRecentlyUpdated];
        expect(callback).toBeDefined();
        callback();
        expect(
            mockApplicationService.getRecentlyUpdated.mock.calls.length,
        ).toBe(1);
    });

    it('should handle searchByTerm request', () => {
        const searchTerm = 'search term';
        const callback = handleAux[channels.application.searchByTerm];
        expect(callback).toBeDefined();

        callback(undefined, [searchTerm]);

        expect(mockApplicationService.searchByTerm.mock.calls.length).toBe(1);
        expect(mockApplicationService.searchByTerm.mock.calls[0][0]).toBe(
            searchTerm,
        );
    });

    it('should handle findByCreationDate request', () => {
        const searchTerm = 'search term';
        const callback = handleAux[channels.application.findByCreationDate];
        expect(callback).toBeDefined();

        callback(undefined, [searchTerm]);

        expect(
            mockApplicationService.findByCreationDate.mock.calls.length,
        ).toBe(1);
        expect(mockApplicationService.findByCreationDate.mock.calls[0][0]).toBe(
            searchTerm,
        );
    });

    it('should handle findByLastReleaseDate request', () => {
        const searchTerm = 'search term';
        const callback = handleAux[channels.application.findByLastReleaseDate];
        expect(callback).toBeDefined();

        callback(undefined, [searchTerm]);

        expect(
            mockApplicationService.findByLastReleaseDate.mock.calls.length,
        ).toBe(1);
        expect(
            mockApplicationService.findByLastReleaseDate.mock.calls[0][0],
        ).toBe(searchTerm);
    });

    it('should handle findByCategory request', () => {
        const searchTerm = 'search term';
        const callback = handleAux[channels.application.findByCategory];
        expect(callback).toBeDefined();

        callback(undefined, [searchTerm]);

        expect(mockApplicationService.findByCategory.mock.calls.length).toBe(1);
        expect(mockApplicationService.findByCategory.mock.calls[0][0]).toBe(
            searchTerm,
        );
    });

    it('should handle findById request', () => {
        const searchTerm = 'search term';
        const callback = handleAux[channels.application.findById];
        expect(callback).toBeDefined();

        callback(undefined, [searchTerm]);

        expect(mockApplicationService.findById.mock.calls.length).toBe(1);
        expect(mockApplicationService.findById.mock.calls[0][0]).toBe(
            searchTerm,
        );
    });

    it('should handle save request', () => {
        const saveParameter = 'save parameter';
        const callback = handleAux[channels.application.save];
        expect(callback).toBeDefined();

        callback(undefined, [saveParameter]);

        expect(mockApplicationService.save.mock.calls.length).toBe(1);
        expect(mockApplicationService.save.mock.calls[0][0]).toBe(
            saveParameter,
        );
    });
});

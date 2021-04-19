describe('[Core] Application service', () => {
    const mockApplicationRepository = {
        getRecentlyAdded: jest.fn(),
        getRecentlyUpdated: jest.fn(),
        searchByTerm: jest.fn(),
        findByCreationDate: jest.fn(),
        findByLastReleaseDate: jest.fn(),
        findByTags: jest.fn(),
        findById: jest.fn(),
        save: jest.fn(),
    };
    const mockTagService = {
        getTagsByCategory: jest.fn(),
    };

    jest.mock(
        '../../repository/application/ApplicationRepository',
        () => mockApplicationRepository,
    );
    jest.mock('../tags/TagsSevice', () => mockTagService);

    const applicationService = require('./ApplicationService');

    it('should get recently added apps', () => {
        applicationService.getRecentlyAdded();
        expect(
            mockApplicationRepository.getRecentlyAdded.mock.calls.length,
        ).toBe(1);
    });

    it('should get recently updated apps', () => {
        applicationService.getRecentlyUpdated();
        expect(
            mockApplicationRepository.getRecentlyUpdated.mock.calls.length,
        ).toBe(1);
    });

    it('should search by term', () => {
        const searchParameter = { searchTerm: 'Outlet' };
        applicationService.searchByTerm(searchParameter);
        expect(mockApplicationRepository.searchByTerm.mock.calls.length).toBe(
            1,
        );
        expect(mockApplicationRepository.searchByTerm.mock.calls[0][0]).toEqual(
            searchParameter,
        );
    });

    it('should find by creation date', () => {
        const searchParameter = { creationDate: new Date() };
        applicationService.findByCreationDate(searchParameter);
        expect(
            mockApplicationRepository.findByCreationDate.mock.calls.length,
        ).toBe(1);
        expect(
            mockApplicationRepository.findByCreationDate.mock.calls[0][0],
        ).toEqual(searchParameter);
    });

    it('should find by last release date', () => {
        const searchParameter = { lastReleaseDate: new Date() };
        applicationService.findByLastReleaseDate(searchParameter);
        expect(
            mockApplicationRepository.findByLastReleaseDate.mock.calls.length,
        ).toBe(1);
        expect(
            mockApplicationRepository.findByLastReleaseDate.mock.calls[0][0],
        ).toEqual(searchParameter);
    });

    it('should find by category', () => {
        const mockTags = ['money', 'finance', 'currency'];
        const searchParameter = { category: 'Finance' };
        const expected = { ...searchParameter, tags: mockTags };

        mockTagService.getTagsByCategory.mockReturnValue(mockTags);

        applicationService.findByCategory(searchParameter);
        expect(mockApplicationRepository.findByTags.mock.calls.length).toBe(1);
        expect(mockApplicationRepository.findByTags.mock.calls[0][0]).toEqual(
            expected,
        );
    });

    it('should find id', () => {
        const id = 'app-outlet.AppOutlet';
        applicationService.findById(id);
        expect(mockApplicationRepository.findById.mock.calls.length).toBe(1);
        expect(mockApplicationRepository.findById.mock.calls[0][0]).toEqual(id);
    });

    it('should save application', () => {
        const application = {
            id: 'applicationId',
            name: 'applicationName',
        };

        applicationService.save(application);
        expect(mockApplicationRepository.save.mock.calls.length).toBe(1);
        expect(mockApplicationRepository.save.mock.calls[0][0]).toEqual(
            application,
        );
    });
});

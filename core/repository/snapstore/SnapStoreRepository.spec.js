describe('Snap store repository', () => {
    const mockedApps = [
        {
            private: false,
            publisher: 'Graham Morrison',
            ratings_average: 0.0,
            release: ['16'],
            revision: 59,
            snap_id: 'lVMsb0E4Z52tx3zny2OKsAR07Gh6ZyzO',
            summary: 'Storage utilisation viewer',
            support_url: '',
            title: 'qFSView',
            version: 'a313751',
            website: 'https://github.com/blastrock/qfsview',
        },
    ];

    const mockResponse = {
        data: {
            results: mockedApps,
        },
    };

    const mockAxios = {
        get: () => Promise.resolve(mockResponse),
    };

    jest.mock('axios', () => mockAxios);

    const snapStoreRepository = require('./SnapStoreRepository');

    it('Should get all apps', async () => {
        const apps = await snapStoreRepository.getApps();

        expect(apps).toEqual(mockedApps);
    });
});

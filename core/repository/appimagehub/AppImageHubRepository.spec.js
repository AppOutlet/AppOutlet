const mockApps = [
    {
        name: 'AKASHA',
        description: 'Akasha platform',
        categories: ['Network'],
        authors: [
            { name: 'AkashaProject', url: 'https://github.com/AkashaProject' },
        ],
        license: null,
        links: [
            { type: 'GitHub', url: 'AkashaProject/Community' },
            {
                type: 'Download',
                url: 'https://github.com/AkashaProject/Community/releases',
            },
        ],
        icons: ['AKASHA/icons/128x128/akasha.png'],
        screenshots: ['AKASHA/screenshot.png'],
    },
];

const mockResponse = {
    data: { items: mockApps },
};

const mockAxios = {
    get: () => Promise.resolve(mockResponse),
};

jest.mock('axios', () => mockAxios);

const appImageHubRepository = require('./AppImageHubRepository');

describe('AppImage Hub repository', () => {
    it('Should get applications', async () => {
        const apps = await appImageHubRepository.getApps();
        expect(apps).toEqual(mockApps);
    });
});

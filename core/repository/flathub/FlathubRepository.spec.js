jest.mock('axios');

const mockAxios = require('axios');
const flathubRepository = require('./FlathubRepository');

describe('Flathub repository', () => {
    it('Should get apps', async () => {
        const apps = await flathubRepository.getApps();
        expect(apps).toEqual(mockAxios.mockApps);
    });

    it('Should get app details', async () => {
        const app = await flathubRepository.getAppDetails(
            mockAxios.mockAppDetail,
        );
        expect(app).toEqual(mockAxios.mockAppDetail);
    });
});

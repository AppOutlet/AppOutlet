const testConnectionFactory = require('../__mocks__/TestConnectionFactory');

jest.mock('uuid', () => 'eb7b7961-395d-4b4c-afc6-9ebcadaf0150');
jest.mock('../ConnectionFactory', () => testConnectionFactory);

describe('Settings repository', () => {
    const settingsRepository = require('./SettingsRepository');

    it('should save settings', async () => {
        await settingsRepository.save('key', 'value');
        const settings = await settingsRepository.findByKey('key');

        expect(settings.value).toEqual('value');
    });

    it('should update settings', async () => {
        await settingsRepository.save('key2', 'value');
        await settingsRepository.save('key2', 'value2');

        const settings = await settingsRepository.findByKey('key2');

        expect(settings.value).toEqual('value2');
    });
});

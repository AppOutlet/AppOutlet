import { TestBed } from '@angular/core/testing';

import { SettingsService } from './settings.service';
import { CoreService } from '../core/core.service';
import { SettingModel } from '../../model/setting.model';

describe('SettingsService', () => {
    let service: SettingsService;
    const mockCoreService = {
        invoke: jest.fn(),
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: CoreService, useValue: mockCoreService }],
        });
        service = TestBed.inject(SettingsService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get theme', async () => {
        const setting: SettingModel = {
            id: 1,
            key: 'theme',
            value: 'cosmic',
        };

        mockCoreService.invoke.mockReturnValue(Promise.resolve(setting));
        const theme = await service.getTheme();
        expect(theme).toEqual(setting.value);

        mockCoreService.invoke.mockReturnValue(Promise.resolve(undefined));
        const nullTheme = await service.getTheme();
        expect(nullTheme).toBeUndefined();
    });

    it('should set theme', async () => {
        const theme = 'cosmic';
        await service.setTheme(theme);

        expect(mockCoreService.invoke.mock.calls[0][1]).toEqual(theme);
    });
});

import { TestBed } from '@angular/core/testing';

import { SettingsService } from './settings.service';
import { CoreService } from '../core/core.service';

describe('SettingsService', () => {
    let service: SettingsService;
    const mockCoreService = {};

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: CoreService, useValue: mockCoreService }],
        });
        service = TestBed.inject(SettingsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

import { TestBed } from '@angular/core/testing';

import { ApplicationService } from './application.service';
import { CoreService } from '../core/core.service';
import { Application } from '../../model/application.model';

describe('ApplicationService', () => {
    let service: ApplicationService;

    const mockCoreService = {
        invoke: jest.fn(),
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: CoreService, useValue: mockCoreService }],
        });
        service = TestBed.inject(ApplicationService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('Should get recently added apps', async () => {
        const mockedApps: Application[] = [{ id: '', name: '' }];

        mockCoreService.invoke.mockReturnValue(Promise.resolve(mockedApps));

        const result = await service.getRecentlyAdded();

        expect(result).toEqual(mockedApps);
    });

    it('Should get recently updated apps', async () => {
        const mockedApps: Application[] = [{ id: '', name: '' }];

        mockCoreService.invoke.mockReturnValue(Promise.resolve(mockedApps));

        const result = await service.getRecentlyUpdated();

        expect(result).toEqual(mockedApps);
    });
});

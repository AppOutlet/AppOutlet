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

    it('should get recently added apps', async () => {
        const mockedApps: Application[] = [{ id: '', name: '' }];

        mockCoreService.invoke.mockReturnValue(Promise.resolve(mockedApps));

        const result = await service.getRecentlyAdded();

        expect(result).toEqual(mockedApps);
    });

    it('should get recently updated apps', async () => {
        const mockedApps: Application[] = [{ id: '', name: '' }];

        mockCoreService.invoke.mockReturnValue(Promise.resolve(mockedApps));

        const result = await service.getRecentlyUpdated();

        expect(result).toEqual(mockedApps);
    });

    it('it should find apps by creation date', async () => {
        const mockedApps: Application[] = [{ id: '1', name: 'Application' }];

        mockCoreService.invoke.mockReturnValue(Promise.resolve(mockedApps));

        const result = await service.findByCreationDate({ page: 0 });

        expect(result).toEqual(mockedApps);
    });

    it('it should find apps by last release date', async () => {
        const mockedApps: Application[] = [{ id: '1', name: 'Application' }];

        mockCoreService.invoke.mockReturnValue(Promise.resolve(mockedApps));

        const result = await service.findByLastReleaseDate({ page: 0 });

        expect(result).toEqual(mockedApps);
    });

    it('should find by category', async () => {
        const mockedApps: Application[] = [{ id: '1', name: 'Application' }];

        mockCoreService.invoke.mockReturnValue(Promise.resolve(mockedApps));

        const result = await service.findByCategory({ page: 0 });

        expect(result).toEqual(mockedApps);
    });

    it('should find by application id', async () => {
        const mockApp: Application = { id: '1', name: 'Application' };

        mockCoreService.invoke.mockReturnValue(Promise.resolve(mockApp));

        const result = await service.findById('some id');

        expect(result).toEqual(mockApp);
    });
});

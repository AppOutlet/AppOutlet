import { TestBed } from '@angular/core/testing';

import { ApplicationService } from './application.service';
import { CoreService } from '../core/core.service';
import { Application } from '../../model/application.model';
import { ProcessService } from '../process/process.service';
import { ApplicationStatus } from '../../model/application-status';
import { of } from 'rxjs';
import { ProcessInfo } from '../process/process-info';
import { ProcessStatus } from '../process/process';

describe('ApplicationService', () => {
    let service: ApplicationService;

    const mockCoreService = {
        invoke: jest.fn(),
    };

    const mockProcessService = {
        installApplication: jest.fn(),
        getApplicationStatus: jest.fn(),
        getProcessListener: jest.fn(),
        uninstallApplication: jest.fn(),
    };

    const mockApplication: Application = { id: '1', name: 'Application' };
    const mockedApps: Application[] = [mockApplication];

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: CoreService, useValue: mockCoreService },
                { provide: ProcessService, useValue: mockProcessService },
            ],
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
        mockCoreService.invoke.mockReturnValue(Promise.resolve(mockedApps));

        const result = await service.getRecentlyAdded();

        expect(result).toEqual(mockedApps);
    });

    it('should get recently updated apps', async () => {
        mockCoreService.invoke.mockReturnValue(Promise.resolve(mockedApps));

        const result = await service.getRecentlyUpdated();

        expect(result).toEqual(mockedApps);
    });

    it('it should find apps by creation date', async () => {
        mockCoreService.invoke.mockReturnValue(Promise.resolve(mockedApps));

        const result = await service.findByCreationDate({ page: 0 });

        expect(result).toEqual(mockedApps);
    });

    it('it should find apps by last release date', async () => {
        mockCoreService.invoke.mockReturnValue(Promise.resolve(mockedApps));

        const result = await service.findByLastReleaseDate({ page: 0 });

        expect(result).toEqual(mockedApps);
    });

    it('should find by category', async () => {
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

    it('should find applications by term', async () => {
        mockCoreService.invoke.mockReturnValue(Promise.resolve(mockedApps));

        const result = await service.findByTerm({
            page: 0,
            searchTerm: 'search term',
        });

        expect(result).toEqual(mockedApps);
    });

    it('should install application', async () => {
        await service.install(mockApplication);

        expect(mockProcessService.installApplication.mock.calls.length).toBe(1);
        expect(mockProcessService.installApplication.mock.calls[0][0]).toEqual(
            mockApplication,
        );
    });

    it('should get application status', async () => {
        const expectedStatus = Promise.resolve(ApplicationStatus.INSTALLED);
        mockProcessService.getApplicationStatus.mockReturnValue(expectedStatus);
        const status = await service.getApplicationStatus(mockApplication);

        expect(status).toBe(ApplicationStatus.INSTALLED);
        expect(mockProcessService.getApplicationStatus.mock.calls.length).toBe(
            1,
        );
        expect(mockProcessService.getApplicationStatus.mock.calls[0][0]).toBe(
            mockApplication,
        );
    });

    it('should get application listener', (done) => {
        const processInfo: ProcessInfo = {
            applicationId: 'appId',
            processStatus: ProcessStatus.IDLE,
        };
        mockProcessService.getProcessListener.mockReturnValue(of(processInfo));

        service.getApplicationListener(mockApplication).subscribe((result) => {
            expect(result).toEqual(processInfo);
            done();
        });
    });

    it('should uninstall application', async () => {
        await service.uninstall(mockApplication);

        expect(mockProcessService.uninstallApplication.mock.calls.length).toBe(
            1,
        );
        expect(
            mockProcessService.uninstallApplication.mock.calls[0][0],
        ).toEqual(mockApplication);
    });
});

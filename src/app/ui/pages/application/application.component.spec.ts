import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationComponent } from './application.component';
import { of, Subject } from 'rxjs';
import { Application } from '../../../model/application.model';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from '../../../service/application/application.service';
import { Location } from '@angular/common';
import { CoreService } from '../../../service/core/core.service';
import { ApplicationStatus } from '../../../model/application-status';
import { ProcessInfo } from '../../../service/process/process-info';
import { ProcessStatus } from '../../../service/process/process';

describe('ApplicationComponent', () => {
    let component: ApplicationComponent;
    let fixture: ComponentFixture<ApplicationComponent>;

    const mockActivatedRoute = {
        paramMap: new Subject(),
    };

    const mockApplicationService = {
        findById: jest.fn(),
        install: jest.fn(),
        getApplicationStatus: jest.fn(),
        uninstall: jest.fn(),
        getApplicationListener: jest.fn(),
    };

    const mockLocation = {};

    const mockCoreService = {
        openLinkOnBrowser: jest.fn(),
    };

    const mockApplication: Application = {
        id: '1',
        name: 'Mock application',
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ApplicationComponent],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                {
                    provide: ApplicationService,
                    useValue: mockApplicationService,
                },
                { provide: Location, useValue: mockLocation },
                { provide: CoreService, useValue: mockCoreService },
            ],
        })
            .overrideComponent(ApplicationComponent, { set: { template: '' } })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ApplicationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load application when the parameters change', (done) => {
        const processInfo: ProcessInfo = {
            applicationId: 'appid',
            processStatus: ProcessStatus.RUNNING,
            completePercentage: 50,
        };

        mockApplicationService.getApplicationListener.mockReturnValue(
            of(processInfo),
        );

        mockApplicationService.findById.mockReturnValue(
            Promise.resolve(mockApplication),
        );

        mockActivatedRoute.paramMap.next({ get: () => '1' });

        setTimeout(() => {
            expect(component.application).toEqual(mockApplication);
            expect(component.isIndefinite).toBeFalsy();
            expect(component.installationPercentage).toBe(50);
            done();
        }, 0);
    });

    it('should not load application if the parameter is undefined', (done) => {
        mockActivatedRoute.paramMap.next({ get: () => undefined });

        setTimeout(() => {
            expect(mockApplicationService.findById.mock.calls.length).toBe(0);
            expect(component.application).toBeUndefined();
            done();
        }, 0);
    });

    it('should open external url', async () => {
        mockCoreService.openLinkOnBrowser.mockReturnValue(Promise.resolve());

        const someUrl = 'https://app-outlet.github.io';

        await component.openUrl();
        await component.openUrl(someUrl);

        expect(mockCoreService.openLinkOnBrowser.mock.calls.length).toBe(1);
        expect(mockCoreService.openLinkOnBrowser.mock.calls[0][0]).toEqual(
            someUrl,
        );
    });

    it('should open store page', async () => {
        component.application = mockApplication;

        component.application.store = 'FLATHUB';
        await component.openStorePage();

        component.application.store = 'SNAP_STORE';
        component.application.packageName = 'package_name';
        await component.openStorePage();

        component.application.store = 'APP_IMAGE_HUB';
        await component.openStorePage();

        component.application.store = 'INVALID_STORE';
        await component.openStorePage();

        expect(mockCoreService.openLinkOnBrowser.mock.calls.length).toBe(3);
        expect(mockCoreService.openLinkOnBrowser.mock.calls[0][0]).toEqual(
            `${ApplicationComponent.FLATHUB_APPLICATION_BASE_URL}/${component.application?.id}`,
        );
        expect(mockCoreService.openLinkOnBrowser.mock.calls[1][0]).toEqual(
            `${ApplicationComponent.SNAP_STORE_APPLICATION_BASE_URL}/${component.application?.packageName}`,
        );
        expect(mockCoreService.openLinkOnBrowser.mock.calls[2][0]).toEqual(
            `${ApplicationComponent.APP_IMAGE_HUB_APPLICATION_BASE_URL}/${component.application?.name}`,
        );
    });

    it('should install application', async () => {
        mockApplicationService.install.mockReturnValue(Promise.resolve());
        mockApplicationService.getApplicationStatus.mockReturnValue(
            Promise.resolve(ApplicationStatus.NOT_INSTALLED),
        );

        await component.install(mockApplication);

        expect(mockApplicationService.install.mock.calls[0][0]).toEqual(
            mockApplication,
        );
        expect(component.applicationStatus).toBe(
            ApplicationStatus.NOT_INSTALLED,
        );
    });

    it('should uninstall applications', () => {
        mockApplicationService.uninstall.mockReturnValue(Promise.resolve());

        component.uninstall(undefined);
        component.uninstall(mockApplication);

        expect(mockApplicationService.uninstall.mock.calls.length).toBe(1);
        expect(mockApplicationService.uninstall.mock.calls[0][0]).toEqual(
            mockApplication,
        );
    });
});

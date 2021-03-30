import { TestBed } from '@angular/core/testing';

import { ProcessService } from './process.service';
import { WindowRef } from '../../util/window-ref';
import { Application } from '../../model/application.model';
import * as PackageType from '../../../../core/model/PackageType';
import { ProcessQueue } from './process-queue';
import { InstallSnap } from './snap/install-snap.process';

describe('ProcessService', () => {
    let service: ProcessService;

    const mockSnapApplication: Application = {
        id: 'sample application',
        name: 'sample applications',
        packageType: PackageType.SNAP,
    };

    const mockWindowRef = {
        nativeWindow: {
            require: (): undefined => undefined,
        },
    };

    const mockProcessQueue = {
        push: jest.fn(),
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: WindowRef, useValue: mockWindowRef },
                { provide: ProcessQueue, useValue: mockProcessQueue },
            ],
        });
        service = TestBed.inject(ProcessService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should install applications', async () => {
        await service.installApplication(mockSnapApplication);

        expect(mockProcessQueue.push.mock.calls.length).toBe(1);
        expect(
            mockProcessQueue.push.mock.calls[0][0] instanceof InstallSnap,
        ).toBeTruthy();
        expect(
            mockProcessQueue.push.mock.calls[0][0].getApplicationId(),
        ).toEqual(mockSnapApplication.id);

        expect(
            service.getProcessListeners()[mockSnapApplication.id],
        ).not.toBeUndefined();
    });

    it('should throw error if package type is not recognized', () => {
        const invalidApplication = {
            id: 'asida78s6d',
            name: 'App',
            packageType: 'invalid',
        };

        service
            .installApplication(invalidApplication)
            .then(() => {
                fail('should fail');
            })
            .catch((e) => {
                expect(e).toEqual('invalid package type');
            });
    });

    it('should get process listener', () => {
        const applicationId = 'ApplicationId';
        expect(service.getProcessListener(applicationId)).not.toBeUndefined();
        expect(
            service.getProcessListeners()[applicationId],
        ).not.toBeUndefined();

        service.getProcessListener(applicationId);

        expect(Object.keys(service.getProcessListeners()).length).toBe(1);
    });
});

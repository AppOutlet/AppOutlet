import { TestBed } from '@angular/core/testing';

import { SetupService } from './setup.service';
import { ProcessService } from '../process/process.service';

describe('SetupService', () => {
    let service: SetupService;

    const mockProcessService = {
        executeCommand: (): Promise<string | undefined> =>
            Promise.resolve(undefined),
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                SetupService,
                { provide: ProcessService, useValue: mockProcessService },
            ],
        });
        service = TestBed.inject(SetupService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should install snapd', async () => {
        await service.installSnapd();
    });

    it('should install flatpak', async () => {
        await service.installFlatpak();
    });

    it('should check if flatpak is installed', async () => {
        await service.checkIfFlatpakIsInstalled();
    });

    it('should check if snapd is installed', async () => {
        await service.checkIfSnapdIsInstalled();
    });

    it('should restart', async () => {
        await service.restart();
    });
});

import { TestBed } from '@angular/core/testing';

import { CoreService } from './core.service';
import { ElectronService } from 'ngx-electron';

describe('CoreService', () => {
    let service: CoreService;

    const mockElectronService = {
        ipcRenderer: {
            invoke: jest.fn(),
        },

        shell: {
            openExternal: jest.fn(),
        },
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CoreService,
                {
                    provide: ElectronService,
                    useValue: mockElectronService,
                },
            ],
        });
        service = TestBed.inject(CoreService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should invoke successfully a method', async () => {
        const sampleReturn = 'https://app-outlet.github.io';
        const sampleArgument = 'https://github.com/app-outlet';

        mockElectronService.ipcRenderer.invoke.mockReturnValue(
            Promise.resolve(sampleReturn),
        );

        const result = await service.invoke<string>(sampleArgument);

        expect(mockElectronService.ipcRenderer.invoke.mock.calls.length).toBe(
            1,
        );

        expect(mockElectronService.ipcRenderer.invoke.mock.calls[0][0]).toBe(
            sampleArgument,
        );

        expect(result).toEqual(sampleReturn);
    });

    it('should open external link', async () => {
        const sampleUrl = 'https://app-outlet.github.io';

        mockElectronService.shell.openExternal.mockReturnValue(
            Promise.resolve(),
        );

        await service.openLinkOnBrowser(sampleUrl);

        expect(mockElectronService.shell.openExternal.mock.calls.length).toBe(
            1,
        );

        expect(mockElectronService.shell.openExternal.mock.calls[0][0]).toBe(
            sampleUrl,
        );
    });
});

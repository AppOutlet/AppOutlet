import { TestBed } from '@angular/core/testing';

import { CoreService } from './core.service';

describe('CoreService', () => {
    let service: CoreService;

    const mockElectronApi = {
        invoke: jest.fn(),
        openExternalUrl: jest.fn(),
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CoreService,
                {
                    provide: 'ElectronApi',
                    useValue: mockElectronApi,
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

        mockElectronApi.invoke.mockReturnValue(Promise.resolve(sampleReturn));

        const result = await service.invoke<string>(sampleArgument);

        expect(mockElectronApi.invoke.mock.calls.length).toBe(1);

        expect(mockElectronApi.invoke.mock.calls[0][0]).toBe(sampleArgument);

        expect(result).toEqual(sampleReturn);
    });

    it('should open external link', async () => {
        const sampleUrl = 'https://app-outlet.github.io';

        mockElectronApi.openExternalUrl.mockReturnValue(Promise.resolve());

        await service.openLinkOnBrowser(sampleUrl);

        expect(mockElectronApi.openExternalUrl.mock.calls.length).toBe(1);

        expect(mockElectronApi.openExternalUrl.mock.calls[0][0]).toBe(
            sampleUrl,
        );
    });
});

import { TestBed } from '@angular/core/testing';

import { CoreService } from './core.service';

describe('CoreService', () => {
    let service: CoreService;

    const mockElectronService = {
        ipcRenderer: {
            invoke: (): jest.Mock => jest.fn(),
        },
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: CoreService,
                    useValue: mockElectronService,
                },
            ],
        });
        service = TestBed.inject(CoreService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

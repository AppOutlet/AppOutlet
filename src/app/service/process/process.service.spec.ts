import { TestBed } from '@angular/core/testing';

import { ProcessService } from './process.service';
import { WindowRef } from '../../util/window-ref';

describe('ProcessService', () => {
    let service: ProcessService;

    const mockWindowRef = {
        nativeWindow: {
            require: (): undefined => undefined,
        },
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: WindowRef, useValue: mockWindowRef }],
        });
        service = TestBed.inject(ProcessService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

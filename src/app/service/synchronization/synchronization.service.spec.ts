import { TestBed } from '@angular/core/testing';

import { SynchronizationService } from './synchronization.service';

describe('SynchronizationService', () => {
    let service: SynchronizationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SynchronizationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

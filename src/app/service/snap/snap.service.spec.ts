import { TestBed } from '@angular/core/testing';

import { SnapService } from './snap.service';

describe('SnapService', () => {
    let service: SnapService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SnapService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

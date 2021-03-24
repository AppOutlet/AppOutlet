import { TestBed } from '@angular/core/testing';

import { FlatpakService } from './flatpak.service';

describe('FlatpakService', () => {
    let service: FlatpakService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FlatpakService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

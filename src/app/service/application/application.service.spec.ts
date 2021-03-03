import { TestBed } from '@angular/core/testing';

import { ApplicationService } from './application.service';

describe('ApplicationService', () => {
    let service: ApplicationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ApplicationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

import { TestBed } from '@angular/core/testing';

import { AppImageService } from './app-image.service';

describe('AppimageService', () => {
    let service: AppImageService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AppImageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

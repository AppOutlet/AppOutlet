import { TestBed } from '@angular/core/testing';

import { AppimageService } from './appimage.service';

describe('AppimageService', () => {
    let service: AppimageService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AppimageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

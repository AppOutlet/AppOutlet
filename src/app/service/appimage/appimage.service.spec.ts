import { TestBed } from '@angular/core/testing';

import { AppImageService } from './app-image.service';
import { GithubService } from '../github/github.service';

describe('AppimageService', () => {
    let service: AppImageService;

    const mockGithubService = {};

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: GithubService, useValue: mockGithubService },
            ],
        });
        service = TestBed.inject(AppImageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

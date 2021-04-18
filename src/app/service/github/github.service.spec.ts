import { TestBed } from '@angular/core/testing';

import { GithubService } from './github.service';
import { HttpClient } from '@angular/common/http';

describe('GithubService', () => {
    let service: GithubService;

    const mockHttpClient = {};

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: HttpClient, useValue: mockHttpClient }],
        });
        service = TestBed.inject(GithubService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

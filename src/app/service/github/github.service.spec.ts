import { TestBed } from '@angular/core/testing';

import { GithubService } from './github.service';
import { HttpClient } from '@angular/common/http';
import { Release, RepositoryData } from './github-models';
import { of } from 'rxjs';
import { Application } from '../../model/application.model';

describe('GithubService', () => {
    let service: GithubService;

    const mockHttpClient = {
        get: jest.fn(),
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: HttpClient, useValue: mockHttpClient }],
        });
        service = TestBed.inject(GithubService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get last release', async () => {
        const mockRelease: Release = {
            name: 'release name',
        };

        const repositoryData: RepositoryData = {
            repository: 'repo',
            username: 'user',
        };
        mockHttpClient.get.mockReturnValue(of(mockRelease));

        const release = await service.getLastRelease(repositoryData);

        expect(release).toEqual(mockRelease);
    });

    it('should get repository data', async () => {
        const application: Application = {
            id: 'id',
            name: 'app',
            homepage: 'http://github.com/app-outlet/karavel',
        };

        const repoData = await service.getRepositoryData(application);

        const expected: RepositoryData = {
            repository: 'karavel',
            username: 'app-outlet',
        };

        expect(repoData).toEqual(expected);
    });

    it('should throw error if app has no homepage', (done) => {
        const application: Application = {
            id: 'id',
            name: 'app',
        };

        service
            .getRepositoryData(application)
            .then(() => {
                fail();
            })
            .catch((err) => {
                expect(err).toBeDefined();
                done();
            });
    });
});

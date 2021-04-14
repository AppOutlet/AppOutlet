import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Release, RepositoryData } from './github-models';
import { Application } from '../../model/application.model';

@Injectable({
    providedIn: 'root',
})
export class GithubService {
    static readonly GITHUB_HOME = 'https://github.com';
    static readonly GITHUB_HOME_UNSECURE = 'http://github.com';

    constructor(private httpClient: HttpClient) {}

    getLastRelease(repositoryData: RepositoryData): Promise<Release> {
        return this.httpClient
            .get<Release>(
                `https://api.github.com/repos/${repositoryData.username}/${repositoryData.repository}/releases/latest`,
            )
            .toPromise();
    }

    getRepositoryData(application: Application): Promise<RepositoryData> {
        const array = application.homepage
            ?.replace(GithubService.GITHUB_HOME, '')
            ?.replace(GithubService.GITHUB_HOME_UNSECURE, '')
            ?.split('/')
            ?.filter((item) => item);

        if (array) {
            return Promise.resolve({
                username: array[0],
                repository: array[1],
            });
        } else {
            return Promise.reject('Cannot get repository data');
        }
    }
}

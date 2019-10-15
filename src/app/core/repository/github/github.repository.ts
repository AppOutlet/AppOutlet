import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, filter } from 'rxjs/operators'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class GithubRepository {

    constructor(private httpClient: HttpClient) { }

    getLatestRelease(url: string) : Observable<any>{
        let latestReleaseEndpoint = 'https://api.github.com/repos/'
        latestReleaseEndpoint = latestReleaseEndpoint + url + '/releases'
        
        return this.httpClient.get(latestReleaseEndpoint)
            .pipe(
                map(this.convertToAssets),
                filter(item => item.browser_download_url.split('.').pop() === 'AppImage')
            )
    }

    private convertToAssets(releases: any): any {
        return releases.assets
    }

}
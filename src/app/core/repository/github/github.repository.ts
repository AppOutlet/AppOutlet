import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, filter, flatMap } from 'rxjs/operators'
import { from } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class GithubRepository {

    constructor(private httpClient: HttpClient) { }

    getLatestRelease(url: string) : any{
        const latestReleaseEndpoint = `https://api.github.com/repos/${url}/releases/latest`
        
        return this.httpClient.get(latestReleaseEndpoint)
            .pipe(
                map(this.convertToAssets),
                flatMap(from),
                filter(item => item.find(link => link.browser_download_url.split('.').pop() === 'AppImage')),
            )
    }

    private convertToAssets(releases: any) {
        return releases.assets
    }

}
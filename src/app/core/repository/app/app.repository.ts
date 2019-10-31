import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Tag } from '../../model/tag.model'
import { AppConfig } from '../../../../environments/environment'
import { App } from '../../model/app.model'

@Injectable({ providedIn: 'root' })
export class AppRepository {

    constructor(private httpClient: HttpClient) { }

    findByTag(tag: Tag) {
        return this.httpClient.get<App[]>(`${AppConfig.baseUrl}/v2/app/search`, {
            params: {
                tags: tag.name
            }
        })
    }

    findByName(query: string) {
        return this.httpClient.get<App[]>(`${AppConfig.baseUrl}/v2/app/search`, {
            params: {
                name: query
            }
        })
    }

    findRecentlyUpdated() {
        return this.httpClient.get<App[]>(`${AppConfig.baseUrl}/app/recent`)
    }

    findNew() {
        return this.httpClient.get<App[]>(`${AppConfig.baseUrl}/app/new`)
    }

    findPopular() {
        return this.httpClient.get<App[]>(`${AppConfig.baseUrl}/app/popular`)
    }

    notifyAppView(_id: string) {
        return this.httpClient.post(`${AppConfig.baseUrl}/app/view`, { id: _id }).subscribe()
    }
}

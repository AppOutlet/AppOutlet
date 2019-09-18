import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Category } from '../../model/category.model'
import { AppConfig } from '../../../../environments/environment'
import { App } from '../../model/app.model'

@Injectable({ providedIn: 'root' })
export class AppRepository {

    constructor(private httpClient: HttpClient) { }

    findByCategory(category: Category) {
        return this.httpClient.get<App[]>(`${AppConfig.baseUrl}/app/search`, {
            params: {
                category: category.name
            }
        })
    }

    findByName(query: string){
        return this.httpClient.get<App[]>(`${AppConfig.baseUrl}/app/search`, {
            params: {
                name: query
            }
        })
    }
}
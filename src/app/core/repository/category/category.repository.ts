import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, from } from 'rxjs'
import { map, bufferCount, flatMap } from 'rxjs/operators'
import { AppConfig } from '../../../../environments/environment'


@Injectable({ providedIn: 'root' })
export class CategoryRepository {

    constructor(private httpClient: HttpClient) { }

    getAll(): Observable<Category[]> {
        return this.httpClient.get(`${AppConfig.baseUrl}/category`).pipe(
            flatMap((data: any) => from(data)),
            map(this.convertToCategory),
            bufferCount(Number.MAX_VALUE)
        )
    }

    private convertToCategory(rawCategory: any): Category {
        return {
            name: rawCategory._id
        }
    }
}

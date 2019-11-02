import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, from } from 'rxjs'
import { map, bufferCount, flatMap } from 'rxjs/operators'
import { AppConfig } from '../../../../environments/environment'
import { Tag } from '../../model/tag.model'


@Injectable({ providedIn: 'root' })
export class TagRepository {

    constructor(private httpClient: HttpClient) { }

    getAll(): Observable<Tag[]> {
        return this.httpClient.get(`${AppConfig.baseUrl}/category`).pipe(
            flatMap((data: any) => from(data)),
            map(this.convertToTag),
            bufferCount(Number.MAX_VALUE)
        )
    }

    private convertToTag(rawCategory: any): Tag {
        return {
            name: rawCategory._id
        }
    }
}

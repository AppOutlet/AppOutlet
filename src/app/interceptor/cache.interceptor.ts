import { Injectable, NgModule } from '@angular/core';
import { Observable, of, from } from 'rxjs'
import { map } from 'rxjs/operators'
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { AppConfig } from '../../environments/environment';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

    private cacheTTL = 86400000 // 24 hours
    private excludeURL = [
        `${AppConfig.baseUrl}/app/view`
    ]

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const rawCache = JSON.parse(window.localStorage.getItem(req.urlWithParams))

        if (this.cacheIsValid(rawCache)) {
            let r = new HttpResponse<any>({ body: rawCache.body.body })
            return of(r)
        }

        return next.handle(req).pipe(
            map((data: any) => {
                if (this.shouldCache(data)) {
                    const item = {
                        date: new Date(),
                        body: data
                    }
                    window.localStorage.setItem(data.url, JSON.stringify(item))
                }
                return data
            })
        )
    }

    shouldCache(data): boolean{
        let dataOk = data.ok
        let validUrl = !this.excludeURL.includes(data.url)
        return dataOk && validUrl
    }

    cacheIsValid(rawCache: any): boolean {
        if (rawCache == null || rawCache.date == null) {
            return false
        }
        const cacheDateString = rawCache.date
        const now = new Date().getTime()
        const cacheDate = new Date(cacheDateString).getTime()
        return now - cacheDate < this.cacheTTL
    }
}

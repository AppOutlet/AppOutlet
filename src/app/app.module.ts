import 'reflect-metadata'
import '../polyfills'

import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http'
import { CoreModule } from './core/core.module'
import { SharedModule } from './shared/shared.module'
import { IonicModule } from '@ionic/angular'
import { AppRoutingModule } from './app-routing.module'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { AppComponent } from './app.component'
import { MainModule } from './presentation/main/main.module'
import { StoreSetupComponent } from './presentation/settings/store-setup/store-setup.component'
import { CacheInterceptor } from './interceptor/cache.interceptor'

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

@NgModule({
    declarations: [AppComponent, StoreSetupComponent],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        CoreModule,
        SharedModule,
        MainModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: CacheInterceptor,
        multi: true,
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }

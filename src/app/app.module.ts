import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbDialogModule, NbThemeModule } from '@nebular/theme';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NbThemeModule.forRoot({ name: 'default' }),
        TranslateModule.forRoot({
            defaultLanguage: 'en',
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        NbDialogModule.forRoot(),
    ],
    providers: [
        {
            provide: 'ElectronApi',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            useValue: (window as any).electronAPI,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

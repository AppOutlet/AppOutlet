import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxElectronModule } from 'ngx-electron';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, NgxElectronModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

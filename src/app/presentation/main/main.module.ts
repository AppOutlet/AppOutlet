import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MainComponent } from './main.component'
import { MainRoutingModule } from './main-routing.module'
import { IonicModule } from '@ionic/angular'
import { MainPresenter } from './main.presenter'
import { MainRouter } from './main.router'
import { FormsModule } from '@angular/forms'
import { EventBusService } from 'ngx-eventbus'
import { HomePresenter } from '../home/home.presenter'
import { SettingsComponent } from '../settings/settings.component'
import { AppearanceComponent } from '../settings/appearance/appearance.component'
import { AccountComponent } from '../settings/account/account.component'
import { AboutComponent } from '../settings/about/about.component'
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
    declarations: [
        MainComponent,
        SettingsComponent,
        AppearanceComponent,
        AccountComponent,
        AboutComponent
    ],
    imports: [
        CommonModule,
        MainRoutingModule,
        IonicModule,
        FormsModule,
        TranslateModule
    ],
    providers: [
        MainPresenter,
        MainRouter,
        EventBusService,
        HomePresenter
    ]
})
export class MainModule { }

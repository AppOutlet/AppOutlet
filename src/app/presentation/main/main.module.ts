import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MainComponent } from './main.component'
import { MainRoutingModule } from './main-routing.module'
import { IonicModule } from '@ionic/angular'
import { SharedModule } from '../../shared/shared.module'
import { MainPresenter } from './main.presenter'
import { MainRouter } from './main.router'
import { SearchResultComponent } from '../search-result/search-result.component'
import { AppDetailComponent } from '../app-detail/app-detail.component'
import { FormsModule } from '@angular/forms'
import { SearchResultPresenter } from '../search-result/search-result.presenter'
import { SearchResultRouter } from '../search-result/search-result.router'
import { EventBusService } from 'ngx-eventbus'
import { HomePresenter } from '../home/home.presenter'
import { AppDetailPresenter } from '../app-detail/app-detail.presenter'
import { SettingsComponent } from '../settings/settings.component'
import { AppearanceComponent } from '../settings/appearance/appearance.component'
import { AccountComponent } from '../settings/account/account.component'
import { AboutComponent } from '../settings/about/about.component'

@NgModule({
    declarations: [
        MainComponent,
        SearchResultComponent,
        AppDetailComponent,
        SettingsComponent,
        AppearanceComponent,
        AccountComponent,
        AboutComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        MainRoutingModule,
        IonicModule,
        FormsModule
    ],
    providers: [
        MainPresenter,
        MainRouter,
        SearchResultPresenter,
        SearchResultRouter,
        EventBusService,
        HomePresenter,
        AppDetailPresenter
    ]
})
export class MainModule { }

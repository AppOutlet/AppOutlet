import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MainComponent } from './main.component'
import { MainRoutingModule } from './main-routing.module'
import { IonicModule } from '@ionic/angular'
import { SharedModule } from '../../shared/shared.module'
import { HomeComponent } from '../home/home.component'
import { MainPresenter } from './main.presenter'
import { MainRouter } from './main.router'
import { SearchResultComponent } from '../search-result/search-result.component'
import { AppDetailComponent } from '../app-detail/app-detail.component'
import { FormsModule } from '@angular/forms'
import { SearchResultPresenter } from '../search-result/search-result.presenter'
import { SearchResultRouter } from '../search-result/search-result.router'

@NgModule({
    declarations: [
        MainComponent,
        HomeComponent,
        SearchResultComponent,
        AppDetailComponent
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
        SearchResultRouter
    ]
})
export class MainModule { }

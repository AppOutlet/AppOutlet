import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MainComponent } from './main.component'
import { MainRoutingModule } from './main-routing.module'
import { IonicModule } from '@ionic/angular'
import { SharedModule } from '../../shared/shared.module'
import { HomeComponent } from '../home/home.component'
import { MainPresenter } from './main.presenter'
import { MainRouter } from './main.router'

@NgModule({
    declarations: [
        MainComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        MainRoutingModule,
        IonicModule
    ],
    providers: [
        MainPresenter,
        MainRouter
    ]
})
export class MainModule { }

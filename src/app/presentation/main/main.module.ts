import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MainComponent } from './main.component'
import { MainRoutingModule } from './main-routing.module'
import { IonicModule } from '@ionic/angular'
import { MainPresenter } from './main.presenter'
import { MainRouter } from './main.router'
import { FormsModule } from '@angular/forms'
import { EventBusService } from 'ngx-eventbus'
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
    declarations: [
        MainComponent
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
        EventBusService
    ]
})
export class MainModule { }

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HomeComponent } from './home.component'
import { Routes, RouterModule } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { SectionModule } from '../../shared/components/section/section.module'
import { HomePresenter } from './home.presenter'

const routes: Routes = [
    { path: '', component: HomeComponent }
]

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        IonicModule,
        SectionModule
    ],
    providers: [
        HomePresenter
    ]
})
export class HomeModule { }

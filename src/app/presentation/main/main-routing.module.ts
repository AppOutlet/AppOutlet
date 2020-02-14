import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { MainComponent } from './main.component'

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [{
            path: '',
            loadChildren: '../home/home.module#HomeModule'
        }, {
            path: 'home',
            loadChildren: '../home/home.module#HomeModule'
        }, {
            path: 'app',
            loadChildren: '../app-detail/app-detail.module#AppDetailModule'
        }, {
            path: 'search/:type',
            loadChildren: '../search-result/search-result.module#SearchResultModule'
        }, {
            path: 'settings',
            loadChildren: '../settings/settings.module#SettingsModule'
        }, {
            path: 'get-involved',
            loadChildren: '../get-involved/get-involved.module#GetInvolvedModule'
        }]
    }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class MainRoutingModule { }

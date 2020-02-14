import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { MainComponent } from './main.component'
import { SettingsComponent } from '../settings/settings.component'
import { AppearanceComponent } from '../settings/appearance/appearance.component'
import { StoreSetupComponent } from '../settings/store-setup/store-setup.component'
import { AccountComponent } from '../settings/account/account.component'
import { AboutComponent } from '../settings/about/about.component'

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
            component: SettingsComponent,
            children: [
                { path: 'appearance', component: AppearanceComponent },
                { path: 'store-setup', component: StoreSetupComponent },
                { path: 'account', component: AccountComponent },
                { path: 'about', component: AboutComponent }
            ]
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

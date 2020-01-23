import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { MainComponent } from './main.component'
import { HomeComponent } from '../home/home.component'
import { AppDetailComponent } from '../app-detail/app-detail.component'
import { SearchResultComponent } from '../search-result/search-result.component'
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
            component: HomeComponent
        }, {
            path: 'home',
            component: HomeComponent
        }, {
            path: 'app',
            component: AppDetailComponent
        }, {
            path: 'search/:type',
            component: SearchResultComponent
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

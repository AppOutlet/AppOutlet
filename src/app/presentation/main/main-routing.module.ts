import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { MainComponent } from './main.component'
import { HomeComponent } from '../home/home.component'
import { AppDetailComponent } from '../app-detail/app-detail.component'
import { SearchResultComponent } from '../search-result/search-result.component'

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
            path: 'search',
            component: SearchResultComponent
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

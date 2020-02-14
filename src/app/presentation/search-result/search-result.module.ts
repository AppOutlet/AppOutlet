import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { SearchResultComponent } from './search-result.component'
import { TranslateModule } from '@ngx-translate/core'
import { IonicModule } from '@ionic/angular'
import { AppCardModule } from '../../shared/components/app-card/app-card.module'
import { SearchResultPresenter } from './search-result.presenter'
import { FormsModule } from '@angular/forms'

const routes: Routes = [{
    path: '',
    component: SearchResultComponent
}]

@NgModule({
    declarations: [SearchResultComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TranslateModule,
        IonicModule,
        AppCardModule,
        FormsModule
    ],
    providers: [
        SearchResultPresenter
    ]
})
export class SearchResultModule { }

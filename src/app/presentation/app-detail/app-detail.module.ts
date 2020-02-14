import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { AppDetailComponent } from './app-detail.component'
import { AppDetailPresenter } from './app-detail.presenter'
import { IonicModule } from '@ionic/angular'
import { TranslateModule } from '@ngx-translate/core'
import { GalleryModule } from '../../shared/components/gallery/gallery.module'

const routes: Routes = [{
    path: '',
    component: AppDetailComponent
}]

@NgModule({
    declarations: [
        AppDetailComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        IonicModule,
        TranslateModule,
        GalleryModule
    ],
    providers: [
        AppDetailPresenter
    ]
})
export class AppDetailModule { }

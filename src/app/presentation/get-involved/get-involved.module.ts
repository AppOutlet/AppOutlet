import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GetInvolvedComponent } from './get-involved.component'
import { Routes, Router, RouterModule } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { TranslateModule } from '@ngx-translate/core'

const routes: Routes = [
    { path: '', component: GetInvolvedComponent }
]

@NgModule({
    declarations: [GetInvolvedComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        IonicModule,
        TranslateModule
    ]
})
export class GetInvolvedModule { }

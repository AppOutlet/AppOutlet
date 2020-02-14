import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { SettingsComponent } from './settings.component'
import { AppearanceComponent } from './appearance/appearance.component'
import { StoreSetupComponent } from './store-setup/store-setup.component'
import { AccountComponent } from './account/account.component'
import { AboutComponent } from './about/about.component'
import { IonicModule } from '@ionic/angular'
import { TranslateModule } from '@ngx-translate/core'
import { FormsModule } from '@angular/forms'

const routes: Routes = [{
    path: '', component: SettingsComponent, children: [
        { path: 'appearance', component: AppearanceComponent },
        { path: 'store-setup', component: StoreSetupComponent },
        { path: 'account', component: AccountComponent },
        { path: 'about', component: AboutComponent }
    ]
}]

@NgModule({
    declarations: [
        SettingsComponent,
        AppearanceComponent,
        StoreSetupComponent,
        AccountComponent,
        AboutComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        IonicModule,
        TranslateModule,
        FormsModule
    ]
})
export class SettingsModule { }

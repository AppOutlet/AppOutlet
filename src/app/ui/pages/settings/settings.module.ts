import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { RouterModule, Routes } from '@angular/router';
import {
    NbCardModule,
    NbIconModule,
    NbSelectModule,
    NbTabsetModule,
} from '@nebular/theme';
import { AppearanceComponent } from './appearance/appearance.component';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [{ path: '', component: SettingsComponent }];

@NgModule({
    declarations: [SettingsComponent, AppearanceComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NbCardModule,
        NbTabsetModule,
        NbIconModule,
        TranslateModule.forChild(),
        NbSelectModule,
    ],
})
export class SettingsModule {}

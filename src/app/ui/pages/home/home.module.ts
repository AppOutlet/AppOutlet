import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { SectionModule } from '../../components/section/section.module';
import { TranslateModule } from '@ngx-translate/core';
import { NbSpinnerModule } from '@nebular/theme';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SectionModule,
        TranslateModule.forChild(),
        NbSpinnerModule,
    ],
})
export class HomeModule {}

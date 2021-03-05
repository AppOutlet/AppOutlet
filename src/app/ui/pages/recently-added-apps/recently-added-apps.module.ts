import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ListModule } from '../../components/list/list.module';
import { RecentlyAddedAppsComponent } from './recently-added-apps.component';

const routes: Routes = [{ path: '', component: RecentlyAddedAppsComponent }];

@NgModule({
    declarations: [RecentlyAddedAppsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ListModule,
        TranslateModule.forChild(),
    ],
})
export class RecentlyAddedAppsModule {}

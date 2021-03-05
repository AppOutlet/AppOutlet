import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { RecentlyUpdatedAppsComponent } from './recently-updated-apps.component';
import { ListModule } from '../../components/list/list.module';

const routes: Routes = [{ path: '', component: RecentlyUpdatedAppsComponent }];

@NgModule({
    declarations: [RecentlyUpdatedAppsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TranslateModule,
        ListModule,
    ],
})
export class RecentlyUpdatedAppsModule {}

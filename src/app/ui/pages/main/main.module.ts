import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';
import {
    NbAlertModule,
    NbCardModule,
    NbLayoutModule,
    NbSidebarModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { MainMenuModule } from '../../components/main-menu/main-menu.module';
import { ToolbarModule } from '../../components/toolbar/toolbar.module';
import { TranslateModule } from '@ngx-translate/core';
import { SynchronizationService } from '../../../service/synchronization/synchronization.service';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'home',
                loadChildren: () =>
                    import('../home/home.module').then((m) => m.HomeModule),
            },
            {
                path: 'category/:category',
                loadChildren: () =>
                    import('../category/category.module').then(
                        (m) => m.CategoryModule,
                    ),
            },
            {
                path: 'recently-added',
                loadChildren: () =>
                    import(
                        '../recently-added-apps/recently-added-apps.module'
                    ).then((m) => m.RecentlyAddedAppsModule),
            },
            {
                path: 'recently-updated',
                loadChildren: () =>
                    import(
                        '../recently-updated-apps/recently-updated-apps.module'
                    ).then((m) => m.RecentlyUpdatedAppsModule),
            },
            {
                path: 'application/:id',
                loadChildren: () =>
                    import('../application/application.module').then(
                        (m) => m.ApplicationModule,
                    ),
            },
            {
                path: 'search/:searchTerm',
                loadChildren: () =>
                    import('../search/search.module').then(
                        (m) => m.SearchModule,
                    ),
            },
            {
                path: 'settings',
                loadChildren: () =>
                    import('../settings/settings.module').then(
                        (m) => m.SettingsModule,
                    ),
            },
            {
                path: 'get-involved',
                loadChildren: () =>
                    import('../get-involved/get-involved.module').then(
                        (m) => m.GetInvolvedModule,
                    ),
            },
            {
                path: '',
                redirectTo: 'home',
            },
        ],
    },
];

/* eslint-enable @typescript-eslint/explicit-function-return-type */

@NgModule({
    declarations: [MainComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        // App Outlet components
        MainMenuModule,
        ToolbarModule,

        // Nebular
        NbLayoutModule,
        NbEvaIconsModule,
        NbSidebarModule.forRoot(),
        NbCardModule,
        NbAlertModule,

        // Other
        TranslateModule.forChild(),
    ],
    providers: [SynchronizationService],
})
export class MainModule {}

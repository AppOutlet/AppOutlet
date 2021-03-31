import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';
import { NbLayoutModule, NbSidebarModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { MainMenuModule } from '../../components/main-menu/main-menu.module';
import { ToolbarModule } from '../../components/toolbar/toolbar.module';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
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
    ],
})
export class MainModule {}

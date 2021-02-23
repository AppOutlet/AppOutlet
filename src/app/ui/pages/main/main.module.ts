import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';
import { NbLayoutModule, NbSidebarModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { MainMenuModule } from '../../components/main-menu/main-menu.module';

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

        // Nebular
        NbLayoutModule,
        NbEvaIconsModule,
        NbSidebarModule.forRoot(),
    ],
})
export class MainModule {}

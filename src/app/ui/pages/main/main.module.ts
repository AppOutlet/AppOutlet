import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';
import { NbLayoutModule, NbSidebarModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { MainMenuModule } from '../../components/main-menu/main-menu.module';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                loadChildren: () =>
                    import('../home/home.module').then((m) => m.HomeModule),
            },
        ],
    },
];

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

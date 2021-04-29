import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./ui/pages/main/main.module').then((m) => m.MainModule),
    },
    {
        path: 'setup',
        loadChildren: () =>
            import('./ui/pages/initial-setup/initial-setup.module').then(
                (m) => m.InitialSetupModule,
            ),
    },
];
/* eslint-enable @typescript-eslint/explicit-function-return-type */

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true,
            scrollPositionRestoration: 'enabled',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}

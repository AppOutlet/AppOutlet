import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        loadChildren: () =>
            import('./ui/pages/main/main.module').then((m) => m.MainModule),
    },
];

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

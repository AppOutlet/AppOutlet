import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetInvolvedComponent } from './get-involved.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme';

const routes: Routes = [{ path: '', component: GetInvolvedComponent }];

@NgModule({
    declarations: [GetInvolvedComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
        NbCardModule,
        NbButtonModule,
        NbIconModule,
    ],
})
export class GetInvolvedModule {}

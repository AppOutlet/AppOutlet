import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetInvolvedComponent } from './get-involved.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: GetInvolvedComponent }];

@NgModule({
    declarations: [GetInvolvedComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class GetInvolvedModule {}

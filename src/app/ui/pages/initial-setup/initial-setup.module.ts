import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialSetupComponent } from './initial-setup.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: InitialSetupComponent }];

@NgModule({
    declarations: [InitialSetupComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class InitialSetupModule {}

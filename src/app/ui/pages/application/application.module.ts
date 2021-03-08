import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './application.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: ApplicationComponent }];

@NgModule({
    declarations: [ApplicationComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ApplicationModule {}

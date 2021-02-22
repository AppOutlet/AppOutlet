import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class HomeModule {}

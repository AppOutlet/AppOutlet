import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { RouterModule, Routes } from '@angular/router';
import { ListModule } from '../../components/list/list.module';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [{ path: '', component: CategoryComponent }];

@NgModule({
    declarations: [CategoryComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ListModule,
        TranslateModule,
    ],
})
export class CategoryModule {}

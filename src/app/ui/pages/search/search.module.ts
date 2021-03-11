import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { RouterModule, Routes } from '@angular/router';
import { ListModule } from '../../components/list/list.module';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [{ path: '', component: SearchComponent }];

@NgModule({
    declarations: [SearchComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ListModule,
        TranslateModule.forChild(),
    ],
})
export class SearchModule {}

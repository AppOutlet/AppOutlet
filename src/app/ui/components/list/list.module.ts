import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './list.component';
import { CardModule } from '../card/card.module';
import { NbSpinnerModule } from '@nebular/theme';

@NgModule({
    declarations: [ListComponent],
    imports: [CommonModule, CardModule, NbSpinnerModule],
    exports: [ListComponent],
})
export class ListModule {}

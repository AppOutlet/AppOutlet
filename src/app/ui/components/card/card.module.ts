import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule } from '@nebular/theme';

import { CardComponent } from './card.component';

@NgModule({
    declarations: [CardComponent],
    imports: [CommonModule, NbCardModule],
    exports: [CardComponent],
})
export class CardModule {}

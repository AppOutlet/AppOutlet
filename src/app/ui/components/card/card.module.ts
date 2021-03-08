import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbBadgeModule, NbCardModule } from '@nebular/theme';

import { CardComponent } from './card.component';

@NgModule({
    declarations: [CardComponent],
    imports: [CommonModule, NbCardModule, NbBadgeModule],
    exports: [CardComponent],
})
export class CardModule {}

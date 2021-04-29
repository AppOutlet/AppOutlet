import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupItemCardComponent } from './setup-item-card.component';
import { NbButtonModule, NbCardModule, NbSpinnerModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [SetupItemCardComponent],
    imports: [
        CommonModule,
        NbCardModule,
        NbButtonModule,
        NbSpinnerModule,
        TranslateModule,
    ],
    exports: [SetupItemCardComponent],
})
export class SetupItemCardModule {}

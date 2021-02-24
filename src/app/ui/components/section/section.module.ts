import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from './section.component';
import { CardModule } from '../card/card.module';
import { NbButtonModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [SectionComponent],
    exports: [SectionComponent],
    imports: [
        CommonModule,
        CardModule,
        NbButtonModule,
        TranslateModule.forChild(),
    ],
})
export class SectionModule {}

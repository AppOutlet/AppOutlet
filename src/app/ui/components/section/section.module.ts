import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from './section.component';
import { CardModule } from '../card/card.module';

@NgModule({
    declarations: [SectionComponent],
    exports: [SectionComponent],
    imports: [CommonModule, CardModule],
})
export class SectionModule {}

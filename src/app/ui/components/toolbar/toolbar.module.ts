import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import {
    NbButtonModule,
    NbContextMenuModule,
    NbIconModule,
    NbSearchModule,
} from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [ToolbarComponent],
    imports: [
        CommonModule,
        NbIconModule,
        NbButtonModule,
        TranslateModule,
        NbSearchModule,
        NbContextMenuModule,
    ],
    exports: [ToolbarComponent],
})
export class ToolbarModule {}

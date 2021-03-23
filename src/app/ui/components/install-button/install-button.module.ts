import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NbButtonModule,
    NbIconModule,
    NbProgressBarModule,
    NbSpinnerModule,
} from '@nebular/theme';
import { InstallButtonComponent } from './install-button.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [InstallButtonComponent],
    imports: [
        CommonModule,
        NbButtonModule,
        NbIconModule,
        TranslateModule.forChild(),
        NbSpinnerModule,
        NbProgressBarModule,
    ],
    exports: [InstallButtonComponent],
})
export class InstallButtonModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule } from '@nebular/theme';
import { InstallButtonComponent } from './install-button.component';

@NgModule({
    declarations: [InstallButtonComponent],
    imports: [CommonModule, NbButtonModule],
    exports: [InstallButtonComponent],
})
export class InstallButtonModule {}

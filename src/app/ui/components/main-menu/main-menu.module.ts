import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './main-menu.component';
import { NbMenuModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [MainMenuComponent],
    imports: [CommonModule, NbMenuModule.forRoot(), TranslateModule.forChild()],
    exports: [MainMenuComponent],
})
export class MainMenuModule {}

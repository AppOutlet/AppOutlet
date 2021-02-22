import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './main-menu.component';
import { NbMenuModule } from '@nebular/theme';

@NgModule({
    declarations: [MainMenuComponent],
    imports: [CommonModule, NbMenuModule.forRoot()],
    exports: [MainMenuComponent],
})
export class MainMenuModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { AppCardComponent } from './components/app-card/app-card.component';

@NgModule({
    declarations: [
        PageNotFoundComponent,
        WebviewDirective,
        AppCardComponent
    ],
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [
        TranslateModule,
        WebviewDirective,
        AppCardComponent
    ]
})
export class SharedModule { }

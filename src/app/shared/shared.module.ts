import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { PageNotFoundComponent } from './components/'
import { WebviewDirective } from './directives/'
import { AppCardComponent } from './components/app-card/app-card.component'
import { IonicModule } from '@ionic/angular'
import { SectionComponent } from './components/section/section.component'

@NgModule({
    declarations: [
        PageNotFoundComponent,
        WebviewDirective,
        AppCardComponent,
        SectionComponent
    ],
    imports: [
        IonicModule,
        CommonModule,
        TranslateModule
    ],
    exports: [
        TranslateModule,
        WebviewDirective,
        AppCardComponent,
        SectionComponent
    ],
    entryComponents: [
        AppCardComponent
    ]
})
export class SharedModule { }

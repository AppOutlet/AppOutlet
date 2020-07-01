import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SectionComponent } from './section.component'
import { IonicModule } from '@ionic/angular'
import { TranslateModule } from '@ngx-translate/core'
import { AppCardModule } from '../app-card/app-card.module'

@NgModule({
    declarations: [SectionComponent],
    imports: [
        CommonModule,
        IonicModule,
        TranslateModule,
        AppCardModule
    ],
    exports: [SectionComponent]
})
export class SectionModule { }

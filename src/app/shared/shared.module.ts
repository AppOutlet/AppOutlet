import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { WebviewDirective } from './directives/'
import { AppCardComponent } from './components/app-card/app-card.component'
import { IonicModule } from '@ionic/angular'
import { SectionComponent } from './components/section/section.component';
import { GalleryComponent } from './components/gallery/gallery.component'

@NgModule({
    declarations: [
        WebviewDirective,
        AppCardComponent,
        SectionComponent,
        GalleryComponent
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
        SectionComponent,
        GalleryComponent
    ],
    entryComponents: [
        AppCardComponent
    ]
})
export class SharedModule { }

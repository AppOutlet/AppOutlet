import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GalleryComponent } from './gallery.component'
import { IonicModule } from '@ionic/angular'

@NgModule({
    declarations: [
        GalleryComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        GalleryComponent
    ]
})
export class GalleryModule { }

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AppCardComponent } from './app-card.component'
import { IonicModule } from '@ionic/angular'

@NgModule({
    declarations: [
        AppCardComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        AppCardComponent
    ]
})
export class AppCardModule { }

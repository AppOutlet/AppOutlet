import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './application.component';
import { RouterModule, Routes } from '@angular/router';
import { NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { GalleryModule } from '../../components/gallery/gallery.module';

const routes: Routes = [{ path: '', component: ApplicationComponent }];

@NgModule({
    declarations: [ApplicationComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NbButtonModule,
        NbIconModule,
        TranslateModule.forChild(),
        NbCardModule,
        NbIconModule,
        GalleryModule,
    ],
})
export class ApplicationModule {}

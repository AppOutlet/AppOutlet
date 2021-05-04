import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialSetupComponent } from './initial-setup.component';
import { RouterModule, Routes } from '@angular/router';
import {
    NbButtonModule,
    NbCardModule,
    NbDialogModule,
    NbLayoutModule,
} from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { SetupItemCardModule } from '../../components/setup-item-card/setup-item-card.module';
import { SetupService } from '../../../service/setup/setup.service';
import { FlatpakInstalledComponent } from './flatpak-installed/flatpak-installed.component';

const routes: Routes = [{ path: '', component: InitialSetupComponent }];

@NgModule({
    declarations: [InitialSetupComponent, FlatpakInstalledComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NbLayoutModule,
        NbCardModule,
        TranslateModule.forChild(),
        NbButtonModule,
        SetupItemCardModule,
        NbDialogModule.forChild(),
    ],
    providers: [SetupService],
})
export class InitialSetupModule {}

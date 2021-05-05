import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialSetupComponent } from './initial-setup.component';
import { RouterModule, Routes } from '@angular/router';
import {
    NbButtonModule,
    NbCardModule,
    NbDialogModule,
    NbIconModule,
    NbLayoutModule,
} from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { SetupItemCardModule } from '../../components/setup-item-card/setup-item-card.module';
import { SetupService } from '../../../service/setup/setup.service';
import { FlatpakInstalledComponent } from './flatpak-installed/flatpak-installed.component';
import { CheckPackagesModalComponent } from './check-packages-modal/check-packages-modal.component';

const routes: Routes = [{ path: '', component: InitialSetupComponent }];

@NgModule({
    declarations: [
        InitialSetupComponent,
        FlatpakInstalledComponent,
        CheckPackagesModalComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NbLayoutModule,
        NbCardModule,
        TranslateModule.forChild(),
        NbButtonModule,
        SetupItemCardModule,
        NbDialogModule.forChild(),
        NbIconModule,
    ],
    providers: [SetupService],
})
export class InitialSetupModule {}

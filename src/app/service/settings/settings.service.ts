import { Injectable } from '@angular/core';
import { CoreService } from '../core/core.service';
import * as Channel from '../../../../core/interface/InterfaceChannel';
import { SettingModel } from '../../model/setting.model';

@Injectable({
    providedIn: 'root',
})
export class SettingsService {
    constructor(private coreService: CoreService) {}

    setTheme(theme: string): Promise<void> {
        return this.coreService.invoke<void>(Channel.settings.setTheme, theme);
    }

    getTheme(): Promise<string> {
        return this.coreService
            .invoke<SettingModel>(Channel.settings.getTheme)
            .then((themeEntity) => themeEntity?.value);
    }
}

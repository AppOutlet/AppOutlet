import { Inject, Injectable } from '@angular/core';
import { ElectronApi } from '../../util/electron-api.interface';

@Injectable({
    providedIn: 'root',
})
export class CoreService {
    constructor(@Inject('ElectronApi') private electronApi: ElectronApi) {}

    invoke<T>(channel: string, ...args: unknown[]): Promise<T> {
        return this.electronApi.invoke(channel, args);
    }

    openLinkOnBrowser(url: string): Promise<void> {
        return this.electronApi.openExternalUrl(url);
    }
}

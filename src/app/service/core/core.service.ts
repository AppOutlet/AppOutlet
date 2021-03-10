import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Injectable({
    providedIn: 'root',
})
export class CoreService {
    constructor(private electronService: ElectronService) {}

    invoke<T>(channel: string, ...args: unknown[]): Promise<T> {
        return this.electronService.ipcRenderer.invoke(channel, args);
    }

    openLinkOnBrowser(url: string): Promise<void> {
        return this.electronService.shell.openExternal(url);
    }
}

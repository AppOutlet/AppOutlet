import { AppOutletChildProcess } from './app-outlet-child-process';

export interface ElectronApi {
    invoke<T>(channel: string, ...args: unknown[]): T;

    openExternalUrl(url: string): Promise<void>;

    getChildProcess(): AppOutletChildProcess;
}

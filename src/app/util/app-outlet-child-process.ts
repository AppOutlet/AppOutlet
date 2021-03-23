export interface AppOutletChildProcess {
    spawn(command: string, args: string[]): AppOutletSpawnResult;
}

export interface AppOutletSpawnResult {
    stdout: AppOutletSpawnResult;
    stderr: AppOutletSpawnResult;
    on(eventName: string, callback: (data: Buffer) => void): void;
}

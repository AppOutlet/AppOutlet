export interface AppOutletChildProcess {
    spawn(command: string, args: string[]): AppOutletSpawnResult;

    exec(
        command: string,
        callback: (error: string, stdout: string, stderr: string) => void,
    ): void;
}

export interface AppOutletSpawnResult {
    stdout: AppOutletSpawnResult;
    stderr: AppOutletSpawnResult;

    on(eventName: string, callback: (data: Buffer) => void): void;
}

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    on(eventName: string, callback: (data: any) => void): void;
}

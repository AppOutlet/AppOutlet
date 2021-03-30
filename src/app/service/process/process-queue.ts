import { Process, ProcessStatus } from './process';
import { ProcessInfo } from './process-info';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProcessQueue {
    private processQueue: Process[] = [];
    private processQueueListener?: (process: Process) => void;

    setProcessQueueListener(listener: (process: Process) => void): void {
        this.processQueueListener = listener;
    }

    push(process: Process): void {
        this.processQueue.push(process);
        this.notifyQueueChanged();
    }

    notifyProcessFinished(process: Process): void {
        if (process.getProcessStatus() !== ProcessStatus.FINISHED) {
            throw new Error('This process is not finished yet');
        }

        const index = this.processQueue.indexOf(process);

        this.processQueue.splice(index, 1);

        this.notifyQueueChanged();
    }

    private notifyQueueChanged(): void {
        const shouldStartNewProcess = this.processQueue.every(
            (process) => process.getProcessStatus() !== ProcessStatus.RUNNING,
        );

        if (shouldStartNewProcess) {
            const firstIdleProcess = this.processQueue.find(
                (process) => process.getProcessStatus() === ProcessStatus.IDLE,
            );

            if (firstIdleProcess) {
                this.processQueueListener?.(firstIdleProcess);
                firstIdleProcess.start();
            }
        }
    }

    getProcessList(): ProcessInfo[] {
        return this.processQueue.map((process) => {
            return process.getProcessInfo();
        });
    }
}

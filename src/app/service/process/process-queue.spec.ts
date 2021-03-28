/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ProcessStatus } from './process';
import { ProcessQueue } from './process-queue';
import { ProcessInfo } from './process-info';

describe('Process queue', () => {
    let processQueue: ProcessQueue;

    beforeEach(() => {
        processQueue = new ProcessQueue();
    });

    it('should start a process if theres only idle process', (done) => {
        const process: unknown = {
            getProcessStatus: (): ProcessStatus => ProcessStatus.IDLE,
        };

        processQueue.setProcessQueueListener((result) => {
            expect(result).toEqual(process);
            done();
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        processQueue.push(process);
    });

    it('should not start a process if theres running process', () => {
        const process: unknown = {
            getProcessStatus: (): ProcessStatus => ProcessStatus.RUNNING,
        };

        processQueue.setProcessQueueListener(() => {
            fail();
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        processQueue.push(process);
    });

    it('should not start a process if theres no idle process', () => {
        const process: unknown = {
            getProcessStatus: (): ProcessStatus => ProcessStatus.FINISHED,
        };

        processQueue.setProcessQueueListener(() => {
            fail();
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        processQueue.push(process);
    });

    it('should remove finished process from queue', () => {
        const finishedProcess: unknown = {
            getProcessStatus: (): ProcessStatus => ProcessStatus.FINISHED,
        };

        const runningProcess: unknown = {
            getApplicationId: (): string => 'ApplicationId',
            getProcessStatus: (): ProcessStatus => ProcessStatus.RUNNING,
            getProcessInfo: (): ProcessInfo => {
                return {
                    applicationId: 'ApplicationId',
                    processStatus: ProcessStatus.RUNNING,
                };
            },
        };

        // @ts-ignore
        processQueue.push(runningProcess);
        // @ts-ignore
        processQueue.push(finishedProcess);
        // @ts-ignore
        processQueue.notifyProcessFinished(finishedProcess);

        const processList = processQueue.getProcessList();
        expect(processList.length).toBe(1);

        expect(processList[0].applicationId).toEqual(
            // @ts-ignore
            runningProcess.getApplicationId(),
        );
    });

    it('should throw error when notify as finished a non finished process', () => {
        const process: unknown = {
            getProcessStatus: (): ProcessStatus => ProcessStatus.RUNNING,
        };

        expect(() => {
            // @ts-ignore
            processQueue.notifyProcessFinished(process);
        }).toThrow('This process is not finished yet');
    });
});

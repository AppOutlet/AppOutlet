import { Application } from '../../../model/application.model';
import { InstallSnap } from './install-snap.process';

describe('Install snap process', () => {
    const mockChildProcess = {};
    const application: Application = {
        confinement: 'classic',
        id: 'application id',
        name: 'application name',
        version: 'application version',
    };

    it('should call on process finished callback', () => {
        const mockProcess = { processId: 1 };

        const underTest = new InstallSnap(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            mockChildProcess,
            application,
            (process) => {
                expect(process).toEqual(mockProcess);
            },
        );

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        underTest.onProcessFinished(mockProcess);
    });
});

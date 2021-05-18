import { SynchronizationService } from './synchronization.service';

describe('SynchronizationService', () => {
    let service: SynchronizationService;

    const mockCoreService = {
        invoke: jest.fn(),
    };

    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        service = new SynchronizationService(mockCoreService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get current synchronization status', async () => {
        mockCoreService.invoke.mockReturnValue(Promise.resolve(true));
        expect(await service.getCurrentSynchronizationStatus()).toBeTruthy();
    });
});

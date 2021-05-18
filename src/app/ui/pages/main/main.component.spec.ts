import { MainComponent } from './main.component';

describe('MainComponent', () => {
    let component: MainComponent;

    const mockSynchronizationService = {
        getCurrentSynchronizationStatus: jest.fn(),
    };

    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        component = new MainComponent(mockSynchronizationService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get current synchronization status', (done) => {
        mockSynchronizationService.getCurrentSynchronizationStatus.mockReturnValue(
            Promise.resolve(true),
        );
        component.ngOnInit();
        setTimeout(() => {
            expect(component.isSynchronizationRunning).toBeTruthy();
            done();
        }, 0);
    });

    it('should hide synchronization message', () => {
        component.closeSynchronizationMessage();
        expect(component.shouldShowSynchronizationMessage).toBeFalsy();
    });
});

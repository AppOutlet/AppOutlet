import { FlatpakInstalledComponent } from './flatpak-installed.component';

describe('FlatpakInstalledComponent', () => {
    let component: FlatpakInstalledComponent;

    const mockDialogRef = { close: jest.fn() };
    const mockSetupService = { restart: jest.fn() };

    beforeEach(() => {
        component = new FlatpakInstalledComponent(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            mockDialogRef,
            mockSetupService,
        );
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should dismiss dialog', () => {
        component.dismiss();

        expect(mockDialogRef.close.mock.calls.length).toBe(1);
    });

    it('should restart computer', () => {
        mockSetupService.restart.mockReturnValue(Promise.resolve());
        component.restart();
        expect(mockSetupService.restart.mock.calls.length).toBe(1);
    });
});

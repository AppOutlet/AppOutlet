import { CheckPackagesModalComponent } from './check-packages-modal.component';

describe('CheckPackagesModalComponent', () => {
    let component: CheckPackagesModalComponent;

    const mockDialogRef = {
        close: jest.fn(),
    };

    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        component = new CheckPackagesModalComponent(mockDialogRef);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should proceed anyway', () => {
        component.proceedAnyway();
        expect(mockDialogRef.close.mock.calls[0][0]).toBeTruthy();
    });

    it('should dismiss', () => {
        component.dismiss();
        expect(mockDialogRef.close.mock.calls[0][0]).toBeFalsy();
    });
});

import { InitialSetupComponent } from './initial-setup.component';
import { CardStatus } from '../../components/setup-item-card/card-status';
import { of } from 'rxjs';

describe('InitialSetupComponent', () => {
    let component: InitialSetupComponent;

    const mockSetupService = {
        checkIfSnapdIsInstalled: jest.fn(),
        checkIfFlatpakIsInstalled: jest.fn(),
        installSnapd: jest.fn(),
        installFlatpak: jest.fn(),
    };

    const mockRouter = {
        navigate: jest.fn(),
    };

    const mockDialogService = {
        open: jest.fn(),
    };

    beforeEach(() => {
        component = new InitialSetupComponent(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            mockSetupService,
            mockRouter,
            mockDialogService,
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should check setup', (done) => {
        mockSetupService.checkIfFlatpakIsInstalled.mockReturnValue(
            Promise.resolve(),
        );
        mockSetupService.checkIfSnapdIsInstalled.mockReturnValue(
            Promise.resolve(),
        );

        component.ngOnInit();

        expect(
            mockSetupService.checkIfFlatpakIsInstalled.mock.calls.length,
        ).toBe(1);
        expect(mockSetupService.checkIfSnapdIsInstalled.mock.calls.length).toBe(
            1,
        );
        expect(component.flatpakStatus).toEqual(CardStatus.LOADING);
        expect(component.snapdStatus).toEqual(CardStatus.LOADING);

        setTimeout(() => {
            expect(component.flatpakStatus).toEqual(CardStatus.INSTALLED);
            expect(component.snapdStatus).toEqual(CardStatus.INSTALLED);
            done();
        }, 0);
    });

    it('should check setup | not installed', (done) => {
        mockSetupService.checkIfFlatpakIsInstalled.mockReturnValue(
            Promise.reject(),
        );
        mockSetupService.checkIfSnapdIsInstalled.mockReturnValue(
            Promise.reject(),
        );

        component.ngOnInit();

        expect(component.flatpakStatus).toEqual(CardStatus.LOADING);
        expect(component.snapdStatus).toEqual(CardStatus.LOADING);

        setTimeout(() => {
            expect(component.flatpakStatus).toEqual(CardStatus.NOT_INSTALLED);
            expect(component.snapdStatus).toEqual(CardStatus.NOT_INSTALLED);
            done();
        }, 0);
    });

    it('should install snapd', (done) => {
        mockSetupService.installSnapd.mockReturnValue(Promise.resolve());

        component.installSnapd();

        expect(component.snapdStatus).toEqual(CardStatus.INSTALLING);

        setTimeout(() => {
            expect(component.snapdStatus).toEqual(CardStatus.INSTALLED);
            done();
        }, 0);
    });

    it('should install snapd | fail', (done) => {
        mockSetupService.installSnapd.mockReturnValue(Promise.reject());

        component.installSnapd();

        expect(component.snapdStatus).toEqual(CardStatus.INSTALLING);

        setTimeout(() => {
            expect(component.snapdStatus).toEqual(CardStatus.ERROR);
            done();
        }, 0);
    });

    it('should install flatpak', (done) => {
        mockSetupService.installFlatpak.mockReturnValue(Promise.resolve());

        component.installFlatpak();

        expect(component.flatpakStatus).toEqual(CardStatus.INSTALLING);

        setTimeout(() => {
            expect(component.flatpakStatus).toEqual(CardStatus.INSTALLED);
            done();
        }, 0);
    });

    it('should install snapd | fail', (done) => {
        mockSetupService.installFlatpak.mockReturnValue(Promise.reject());

        component.installFlatpak();

        expect(component.flatpakStatus).toEqual(CardStatus.INSTALLING);

        setTimeout(() => {
            expect(component.flatpakStatus).toEqual(CardStatus.ERROR);
            done();
        }, 0);
    });

    it('should go to main', () => {
        mockRouter.navigate.mockReturnValue(Promise.resolve());

        component.snapdStatus = CardStatus.INSTALLED;
        component.flatpakStatus = CardStatus.INSTALLED;

        component.goToMain();

        expect(mockRouter.navigate.mock.calls.length).toBe(1);
    });

    it('should go to main | force', () => {
        mockRouter.navigate.mockReturnValue(Promise.resolve());

        component.snapdStatus = CardStatus.NOT_INSTALLED;
        component.flatpakStatus = CardStatus.ERROR;

        component.goToMain(true);

        expect(mockRouter.navigate.mock.calls.length).toBe(1);
    });

    it('should go to main | open modal | proceed anyway', () => {
        mockRouter.navigate.mockReturnValue(Promise.resolve());
        mockDialogService.open.mockReturnValue({ onClose: of(true) });

        component.snapdStatus = CardStatus.NOT_INSTALLED;
        component.flatpakStatus = CardStatus.ERROR;

        component.goToMain();

        expect(mockRouter.navigate.mock.calls.length).toBe(1);
        expect(mockDialogService.open.mock.calls.length).toBe(1);
    });

    it('should go to main | open modal | dismiss', () => {
        mockRouter.navigate.mockReturnValue(Promise.resolve());
        mockDialogService.open.mockReturnValue({ onClose: of(false) });

        component.snapdStatus = CardStatus.NOT_INSTALLED;
        component.flatpakStatus = CardStatus.ERROR;

        component.goToMain();

        expect(mockRouter.navigate.mock.calls.length).toBe(0);
        expect(mockDialogService.open.mock.calls.length).toBe(1);
    });
});

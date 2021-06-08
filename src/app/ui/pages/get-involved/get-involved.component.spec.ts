import { GetInvolvedComponent } from './get-involved.component';

describe('GetInvolvedComponent', () => {
    let component: GetInvolvedComponent;
    const mockCoreService = {
        openLinkOnBrowser: jest.fn(),
    };

    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        component = new GetInvolvedComponent(mockCoreService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open link', () => {
        mockCoreService.openLinkOnBrowser.mockReturnValue(Promise.resolve());
        const url = 'https://app-outlet.github.io';
        component.openLink(url);
        expect(mockCoreService.openLinkOnBrowser.mock.calls[0][0]).toEqual(url);
    });
});

import { SetupItemCardComponent } from './setup-item-card.component';

describe('SetupItemCardComponent', () => {
    let component: SetupItemCardComponent;

    beforeEach(() => {
        component = new SetupItemCardComponent();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit event', (done) => {
        component.installClicked.subscribe(() => {
            done();
        });
        component.onInstallClicked();
    });
});

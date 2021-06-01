import { Component } from '@angular/core';
import { CoreService } from '../../../service/core/core.service';

@Component({
    selector: 'app-get-involved',
    templateUrl: './get-involved.component.html',
    styleUrls: ['./get-involved.component.scss'],
})
export class GetInvolvedComponent {
    constructor(private coreService: CoreService) {}

    openLink(url: string): void {
        this.coreService.openLinkOnBrowser(url).then();
    }
}

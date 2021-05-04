import { Injectable } from '@angular/core';
import { ProcessService } from '../process/process.service';

@Injectable()
export class SetupService {
    constructor(private processService: ProcessService) {}

    installSnapd(): Promise<string> {
        return this.processService.executeCommand(
            'pkexec apt-get install snapd -y',
        );
    }

    installFlatpak(): Promise<string> {
        return this.processService.executeCommand(
            'pkexec apt-get install flatpak -y && flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo',
        );
    }

    checkIfSnapdIsInstalled(): Promise<string> {
        return this.processService.executeCommand('snap version');
    }

    checkIfFlatpakIsInstalled(): Promise<string> {
        return this.processService.executeCommand('flatpak --version');
    }
}

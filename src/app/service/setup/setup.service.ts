import { Injectable } from '@angular/core';
import { ProcessService } from '../process/process.service';

@Injectable()
export class SetupService {
    constructor(private processService: ProcessService) {}

    installSnapd(): Promise<string> {
        return this.processService.executeCommand('pkexec apt install snapd');
    }

    installFlatpak(): Promise<string> {
        return this.processService.executeCommand('pkexec apt install snapd');
    }

    checkIfSnapdIsIntalled(): void {
        this.processService.executeCommand('pkexec apt install snapd');
    }

    checkIfFlatpakIsIntalled(): void {
        this.processService.executeCommand('pkexec apt install snapd');
    }
}

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WindowRef {
    get nativeWindow(): Window {
        return window;
    }
}

import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DesignerService {
    preset = signal({ primitive: null, semantic: null });

    acTokens = signal([]);

    private themeUpdatedSource = new Subject<void>();

    themeUpdated$ = this.themeUpdatedSource.asObservable();

    updateTheme() {
        this.themeUpdatedSource.next();
    }

    setPreset(preset) {
        this.preset.set(preset);
    }

    setAcTokens(token) {
        this.acTokens.set(token);
    }
}

import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DesignerService {
    preset = signal({ primitive: null, semantic: null });

    acTokens = signal([]);

    setPreset(preset) {
        this.preset.set(preset);
    }

    setAcTokens(token) {
        this.acTokens.set(token);
    }
}

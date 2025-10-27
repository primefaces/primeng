import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { OverlayModule } from 'primeng/overlay';

@Component({
    selector: 'overlay-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, OverlayModule, ButtonModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-button label="Show Overlay" (click)="toggle()" />
            <p-overlay [(visible)]="visible" [contentStyle]="{ width: '450px' }">
                <div class="flex flex-col gap-4 w-full">
                    <div>
                        <span class="font-medium text-surface-900 dark:text-surface-0 block mb-2">Share this document</span>
                        <input type="text" placeholder="Email" class="w-full p-3 border border-surface-300 dark:border-surface-600 rounded-md" />
                    </div>
                    <div class="flex items-center gap-2">
                        <p-button label="Save" (click)="visible = false" styleClass="w-full"></p-button>
                        <p-button label="Close" (click)="visible = false" [outlined]="true" styleClass="w-full"></p-button>
                    </div>
                </div>
            </p-overlay>
        </app-docptviewer>
    `
})
export class PTViewer {
    visible: boolean = false;

    docs = [
        {
            data: getPTOptions('Overlay'),
            key: 'Overlay'
        }
    ];

    toggle() {
        this.visible = !this.visible;
    }
}

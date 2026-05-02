import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, ButtonModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-button label="Profile" icon="pi pi-user" severity="secondary" badge="2" badgeSeverity="contrast" />
        </app-docptviewer>
    `
})
export class PTViewer {
    docs = [
        {
            data: getPTOptions('Button'),
            key: 'Button'
        }
    ];
}

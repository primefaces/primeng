import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
    selector: 'progressspinner-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, ProgressSpinnerModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-progressspinner />
        </app-docptviewer>
    `
})
export class PTViewer {
    docs = [
        {
            data: getPTOptions('ProgressSpinner'),
            key: 'ProgressSpinner'
        }
    ];
}

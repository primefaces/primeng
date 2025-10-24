import { AppDocApiTable } from '@/components/doc/app.docapitable';
import { getPTOptions } from '@/components/doc/app.docptviewer';
import { AppDocSection } from '@/components/doc/app.docsection';
import { PTViewer } from '@/doc/confirmpopup/pt/PTViewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'confirmpopup-pt-component',
    standalone: true,
    imports: [CommonModule, AppDocSection],
    template: `<div class="doc-main">
        <div class="doc-intro">
            <h1>ConfirmPopup Pass Through</h1>
        </div>
        <app-docsection [docs]="docs" />
    </div>`
})
export class PTComponent {
    docs = [
        {
            id: 'pt.viewer',
            label: 'Viewer',
            component: PTViewer
        },
        {
            id: 'pt.doc.confirmpopup',
            label: 'ConfirmPopup PT Options',
            component: AppDocApiTable,
            data: getPTOptions('ConfirmPopup')
        }
    ];
}

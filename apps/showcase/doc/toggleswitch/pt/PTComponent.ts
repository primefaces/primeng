import { AppDocPtTable } from '@/components/doc/app.docpttable';
import { getPTOptions } from '@/components/doc/app.docptviewer';
import { AppDocSection } from '@/components/doc/app.docsection';
import { Component } from '@angular/core';
import { PTViewer } from './PTViewer';

@Component({
    selector: 'toggleswitch-pt-component',
    standalone: true,
    imports: [AppDocSection],
    template: `
        <div class="doc-main">
            <div class="doc-intro"><h1>ToggleSwitch Pass Through</h1></div>
            <app-docsection [docs]="docs" />
        </div>
    `
})
export class PTComponent {
    docs = [
        { id: 'pt.viewer', label: 'Viewer', component: PTViewer },
        { id: 'pt.doc.toggleswitch', label: 'ToggleSwitch PT Options', component: AppDocPtTable, data: getPTOptions('ToggleSwitch') }
    ];
}

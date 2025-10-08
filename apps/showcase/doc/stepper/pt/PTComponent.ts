import { AppDocApiTable } from '@/components/doc/app.docapitable';
import { getPTOptions } from '@/components/doc/app.docptviewer';
import { AppDocSection } from '@/components/doc/app.docsection';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PTViewer } from './PTViewer';

@Component({
    selector: 'stepper-pt-component',
    standalone: true,
    imports: [CommonModule, AppDocSection],
    template: `<div class="doc-main">
        <div class="doc-intro">
            <h1>Stepper Pass Through</h1>
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
            id: 'pt.doc.stepper',
            label: 'Stepper PT Options',
            component: AppDocApiTable,
            data: getPTOptions('Stepper')
        },
        {
            id: 'pt.doc.stepperseparator',
            label: 'StepperSeparator PT Options',
            component: AppDocApiTable,
            data: getPTOptions('StepperSeparator')
        },
        {
            id: 'pt.doc.steplist',
            label: 'StepList PT Options',
            component: AppDocApiTable,
            data: getPTOptions('StepList')
        },
        {
            id: 'pt.doc.step',
            label: 'Step PT Options',
            component: AppDocApiTable,
            data: getPTOptions('Step')
        },
        {
            id: 'pt.doc.steppanels',
            label: 'StepPanels PT Options',
            component: AppDocApiTable,
            data: getPTOptions('StepPanels')
        },
        {
            id: 'pt.doc.steppanel',
            label: 'StepPanel PT Options',
            component: AppDocApiTable,
            data: getPTOptions('StepPanel')
        }
    ];
}

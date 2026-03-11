import { AppDocPtTable } from '@/components/doc/app.docpttable';
import { getPTOptions } from '@/components/doc/app.docptviewer';
import { AppDocSection } from '@/components/doc/app.docsection';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PTViewer } from './PTViewer';

@Component({
    selector: 'accordion-pt-component',
    standalone: true,
    imports: [CommonModule, AppDocSection],
    template: `<div class="doc-main">
        <div class="doc-intro">
            <h1>Accordion Pass Through</h1>
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
            id: 'pt.doc.accordion',
            label: 'Accordion PT Options',
            component: AppDocPtTable,
            data: getPTOptions('Accordion')
        },
        {
            id: 'pt.doc.accordionpanel',
            label: 'AccordionPanel PT Options',
            component: AppDocPtTable,
            data: getPTOptions('AccordionPanel')
        },
        {
            id: 'pt.doc.accordionheader',
            label: 'AccordionHeader PT Options',
            component: AppDocPtTable,
            data: getPTOptions('AccordionHeader')
        },
        {
            id: 'pt.doc.accordioncontent',
            label: 'AccordionContent PT Options',
            component: AppDocPtTable,
            data: getPTOptions('AccordionContent')
        }
    ];
}

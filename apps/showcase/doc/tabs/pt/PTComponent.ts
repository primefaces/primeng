import { AppDocPtTable } from '@/components/doc/app.docpttable';
import { getPTOptions } from '@/components/doc/app.docptviewer';
import { AppDocSection } from '@/components/doc/app.docsection';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PTViewer } from './PTViewer';

@Component({
    selector: 'tabs-pt-component',
    standalone: true,
    imports: [CommonModule, AppDocSection],
    template: `<div class="doc-main">
        <div class="doc-intro">
            <h1>Tabs Pass Through</h1>
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
            id: 'pt.doc.tabs',
            label: 'Tabs PT Options',
            component: AppDocPtTable,
            data: getPTOptions('Tabs')
        },
        {
            id: 'pt.doc.tablist',
            label: 'TabList PT Options',
            component: AppDocPtTable,
            data: getPTOptions('TabList')
        },
        {
            id: 'pt.doc.tab',
            label: 'Tab PT Options',
            component: AppDocPtTable,
            data: getPTOptions('Tab')
        },
        {
            id: 'pt.doc.tabpanels',
            label: 'TabPanels PT Options',
            component: AppDocPtTable,
            data: getPTOptions('TabPanels')
        },
        {
            id: 'pt.doc.tabpanel',
            label: 'TabPanel PT Options',
            component: AppDocPtTable,
            data: getPTOptions('TabPanel')
        }
    ];
}

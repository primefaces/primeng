import { AppDocApiTable } from '@/components/doc/app.docapitable';
import { getPTOptions } from '@/components/doc/app.docptviewer';
import { AppDocSection } from '@/components/doc/app.docsection';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PTViewer } from './PTViewer';

@Component({
    selector: 'table-pt-component',
    standalone: true,
    imports: [CommonModule, AppDocSection],
    template: `<div class="doc-main">
        <div class="doc-intro">
            <h1>Table Pass Through</h1>
        </div>
        <app-docsection [docs]="docs" />
    </div> `
})
export class PTComponent {
    docs = [
        {
            id: 'pt-viewer',
            label: 'PT Viewer',
            component: PTViewer
        },
        {
            id: 'pt.doc.table',
            label: 'Table PT Options',
            component: AppDocApiTable,
            data: getPTOptions('Table')
        },
        {
            id: 'pt.doc.table.column.filter',
            label: 'Column Filter PT Options',
            component: AppDocApiTable,
            data: getPTOptions('ColumnFilter')
        }
    ];
}

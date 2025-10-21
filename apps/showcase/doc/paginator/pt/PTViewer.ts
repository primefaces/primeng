import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';

@Component({
    selector: 'paginator-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, PaginatorModule],
    template: `
        <app-docptviewer [docs]="docs">
            <div class="w-full">
                <p-paginator [rows]="10" [totalRecords]="120" [rowsPerPageOptions]="[10, 20, 30]"></p-paginator>
            </div>
        </app-docptviewer>
    `
})
export class PTViewer {
    docs = [
        {
            data: getPTOptions('Paginator'),
            key: 'Paginator'
        }
    ];
}

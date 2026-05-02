import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'tag-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, TagModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-tag icon="pi pi-user" value="Primary"></p-tag>
        </app-docptviewer>
    `
})
export class PTViewer {
    docs = [
        {
            data: getPTOptions('Tag'),
            key: 'Tag'
        }
    ];
}

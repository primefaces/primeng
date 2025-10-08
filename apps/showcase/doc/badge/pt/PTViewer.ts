import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BadgeModule } from 'primeng/badge';

@Component({
    selector: 'badge-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, BadgeModule],
    template: `
        <app-docptviewer [docs]="docs">
            <div class="flex flex-wrap gap-8">
                <p-badge value="2"></p-badge>
                <p-badge value="8" severity="success"></p-badge>
                <p-badge value="4" severity="info"></p-badge>
                <p-badge value="12" severity="warn"></p-badge>
                <p-badge value="3" severity="danger"></p-badge>
            </div>
        </app-docptviewer>
    `
})
export class PTViewer {
    docs = [
        {
            data: getPTOptions('Badge'),
            key: 'Badge'
        }
    ];
}

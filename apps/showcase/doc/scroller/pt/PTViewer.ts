import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClassNamesModule } from 'primeng/classnames';
import { ScrollerModule } from 'primeng/scroller';

@Component({
    selector: 'scroller-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, ClassNamesModule, ScrollerModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-scroller [items]="items" [itemSize]="50" styleClass="border border-surface-200 dark:border-surface-700" [style]="{ width: '200px', height: '200px' }">
                <ng-template #item let-item let-options="options">
                    <div [pClass]="['flex items-center p-2', { 'bg-surface-100 dark:bg-surface-700': options.odd }]" style="height: 50px">
                        {{ item }}
                    </div>
                </ng-template>
            </p-scroller>
        </app-docptviewer>
    `
})
export class PTViewer {
    items = Array.from({ length: 100 }, (_, i) => `Item #${i}`);

    docs = [
        {
            data: getPTOptions('Scroller'),
            key: 'Scroller'
        }
    ];
}

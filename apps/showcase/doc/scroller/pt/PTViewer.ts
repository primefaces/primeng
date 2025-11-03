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
            <p-virtualscroller [items]="items" [itemSize]="50" scrollHeight="200px" styleClass="border border-surface" [style]="{ width: '200px', height: '200px' }">
                <ng-template #item let-item let-options="options">
                    <div class="flex items-center p-2" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }" style="height: 50px;">
                        {{ item }}
                    </div>
                </ng-template>
            </p-virtualscroller>
        </app-docptviewer>
    `
})
export class PTViewer {
    items!: string[];

    ngOnInit() {
        this.items = Array.from({ length: 1000 }).map((_, i) => `Item #${i}`);
    }
    docs = [
        {
            data: getPTOptions('Scroller'),
            key: 'Scroller'
        }
    ];
}

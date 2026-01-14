import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScrollerModule } from 'primeng/scroller';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'horizontal-doc',
    standalone: true,
    imports: [ScrollerModule, AppCode, AppDocSectionText, CommonModule],
    template: `
        <app-docsectiontext>
            <p>Setting <i>orientation</i> to <i>horizontal</i> enables scrolling horizontally. In this case, the <i>itemSize</i> should refer to the width of an item.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-virtualscroller [items]="items" [itemSize]="50" scrollHeight="200px" orientation="horizontal" styleClass="border border-surface" [style]="{ width: '200px', height: '200px' }">
                <ng-template #item let-item let-options="options">
                    <div class="flex items-center p-2" style="writing-mode: vertical-lr; width: 50px;" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }">
                        {{ item }}
                    </div>
                </ng-template>
            </p-virtualscroller>
        </div>
        <app-code></app-code>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HorizontalDoc {
    items!: string[];

    ngOnInit() {
        this.items = Array.from({ length: 1000 }).map((_, i) => `Item #${i}`);
    }
}

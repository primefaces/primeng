import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ScrollerModule } from 'primeng/scroller';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { NgClass } from '@angular/common';

@Component({
    selector: 'grid-doc',
    standalone: true,
    imports: [ScrollerModule, AppCode, AppDemoWrapper, AppDocSectionText, NgClass],
    template: `
        <app-docsectiontext>
            <p>Scrolling can be enabled vertically and horizontally when <i>orientation</i> is set as <i>both</i>. In this mode, <i>itemSize</i> should be an array where first value is the height of an item and second is the width.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-virtualscroller [items]="items" [itemSize]="[50, 100]" orientation="both" styleClass="border border-surface" [style]="{ width: '200px', height: '200px' }">
                    <ng-template #item let-item let-options="options">
                        <div class="flex items-center p-2 text-sm" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }" style="height: 50px;">
                            @for (el of item; track $index) {
                                <div style="width: 100px">{{ el }}</div>
                            }
                        </div>
                    </ng-template>
                </p-virtualscroller>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridDoc implements OnInit {
    items!: string[][];

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.items = Array.from({ length: 1000 }).map((_, i) => Array.from({ length: 1000 }).map((_j, j) => `Item #${i}_${j}`));
        this.cd.markForCheck();
    }
}

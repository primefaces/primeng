import { Component, OnInit, ViewChild } from '@angular/core';
import { Scroller, ScrollerModule } from 'primeng/scroller';
import { ButtonModule } from 'primeng/button';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'programmatic-doc',
    standalone: true,
    imports: [ScrollerModule, ButtonModule, AppCode, AppDocSectionText, CommonModule],
    template: `
        <app-docsectiontext>
            <p>Scrolling to a specific index can be done with the <i>scrollToIndex</i> function.</p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center gap-4">
            <p-button label="Reset" (click)="reset()" />
            <p-virtualscroller #sc [items]="items" [itemSize]="50" scrollHeight="200px" styleClass="border border-surface" [style]="{ width: '200px', height: '200px' }">
                <ng-template #item let-item let-options="options">
                    <div class="flex items-center p-2" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }" style="height: 50px;">
                        {{ item }}
                    </div>
                </ng-template>
            </p-virtualscroller>
        </div>
        <app-code selector="scroller-programmatic-demo"></app-code>
    `
})
export class ProgrammaticDoc implements OnInit {
    @ViewChild('sc') sc!: Scroller;

    items: string[] = [];

    ngOnInit(): void {
        this.items = Array.from({ length: 1000 }).map((_, i) => `Item #${i}`);
    }

    reset() {
        this.sc.scrollToIndex(0, 'smooth');
    }
}

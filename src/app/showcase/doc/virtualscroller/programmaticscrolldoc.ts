import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { VirtualScroller } from 'primeng/virtualscroller';
import { Code } from '../../domain/code';

interface Item {
    label: string;
    index: number;
}
@Component({
    selector: 'programmatic-scroll-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Scrolling to a specific index can be done with the <i>scrollToIndex</i> function.</p>
        </app-docsectiontext>
        <div class="card flex flex-column align-items-center gap-3">
            <p-button label="Reset" (click)="reset()"></p-button>
            <p-virtualScroller #vs [value]="items" class="border-1 surface-border border-round" [style]="{ width: '200px' }" scrollHeight="200px" [itemSize]="50">
                <ng-template pTemplate="item" let-item>
                    <div class="flex align-items-center p-2 h-full" [ngClass]="{ 'surface-hover': item.index % 2 === 0 }">
                        {{ item.label }}
                    </div>
                </ng-template>
            </p-virtualScroller>
        </div>
        <app-code [code]="code" selector="virtual-scroller-programmatic-scroll-demo"></app-code>
    </section>`
})
export class ProgrammaticScrollDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    @ViewChild('vs') vs!: VirtualScroller;

    items: Item[] = [];

    ngOnInit(): void {
        for (let i = 0; i < 10000; i++) {
            this.items.push({ label: 'Item #' + i, index: i });
        }
    }

    reset() {
        this.vs.scrollToIndex(0, 'smooth');
    }

    code: Code = {
        basic: `
<p-button label="Reset" (click)="reset()"></p-button>
<p-virtualScroller #vs [value]="items" class="border-1 surface-border border-round" [style]="{ width: '200px' }" scrollHeight="200px" [itemSize]="50">
    <ng-template pTemplate="item" let-item>
        <div class="flex align-items-center p-2 h-full" [ngClass]="{ 'surface-hover': item.index % 2 === 0 }">
            {{ item.label }}
        </div>
    </ng-template>
</p-virtualScroller>`,

        html: `
<div class="card flex flex-column align-items-center gap-3">
    <p-button label="Reset" (click)="reset()"></p-button>
    <p-virtualScroller #vs [value]="items" class="border-1 surface-border border-round" [style]="{ width: '200px' }" scrollHeight="200px" [itemSize]="50">
        <ng-template pTemplate="item" let-item>
            <div class="flex align-items-center p-2 h-full" [ngClass]="{ 'surface-hover': item.index % 2 === 0 }">
                {{ item.label }}
            </div>
        </ng-template>
    </p-virtualScroller>
</div>`,

        typescript: `
import { Component, OnInit, ViewChild } from '@angular/core';
import { VirtualScroller } from 'primeng/virtualscroller';

interface Item {
    label: string;
    index: number;
}

@Component({
    selector: 'virtual-scroller-programmatic-scroll-demo',
    templateUrl: './virtual-scroller-programmatic-scroll-demo.html'
})
export class VirtualScrollerProgrammaticScrollDemo implements OnInit {
    @ViewChild('vs') vs!: VirtualScroller;

    items: Item[] = [];

    ngOnInit(): void {
        for (let i = 0; i < 10000; i++) {
            this.items.push({ label: 'Item #' + i, index: i });
        }
    }

    reset() {
        this.vs.scrollToIndex(0, 'smooth');
    }
}`
    };
}

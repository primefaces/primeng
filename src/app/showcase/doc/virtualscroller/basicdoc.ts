import { Component, Input, OnInit } from '@angular/core';
import { Code } from '../../domain/code';

interface Item {
    label: string;
    index: number;
}
@Component({
    selector: 'basic-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                VirtualScroller requires <i>value</i> as the data to display, <i>itemSize</i> for the dimensions of an item and <i>pTemplate</i> to define the content per item. Size of the viewport is configured using <i>scrollWidth</i>,
                <i>scrollHeight</i> properties directly or with CSS <i>width</i> and <i>height</i> styles.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-virtualScroller [value]="items" class="border-1 surface-border border-round" [style]="{ width: '200px' }" scrollHeight="200px" [itemSize]="50">
                <ng-template pTemplate="item" let-item>
                    <div class="flex align-items-center p-2 h-full" [ngClass]="{ 'surface-hover': item.index % 2 === 0 }">
                        {{ item.label }}
                    </div>
                </ng-template>
            </p-virtualScroller>
        </div>
        <app-code [code]="code" selector="virtual-scroller-basic-demo"></app-code>
    </section>`
})
export class BasicDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    items: Item[] = [];

    ngOnInit(): void {
        for (let i = 0; i < 10000; i++) {
            this.items.push({ label: 'Item #' + i, index: i });
        }
    }

    code: Code = {
        basic: `
<p-virtualScroller [value]="items" class="border-1 surface-border border-round" [style]="{'width': '200px'}" scrollHeight="200px" [itemSize]="50">
    <ng-template pTemplate="item" let-item>
        <div class="flex align-items-center p-2 h-full" [ngClass]="{ 'surface-hover': item.index % 2 === 0 }">
            {{ item.label }}
        </div>
    </ng-template>
</p-virtualScroller>`,

        html: `
<div class="card flex justify-content-center">
    <p-virtualScroller [value]="items" class="border-1 surface-border border-round" [style]="{'width': '200px'}" scrollHeight="200px" [itemSize]="50">
        <ng-template pTemplate="item" let-item>
            <div class="flex align-items-center p-2 h-full" [ngClass]="{ 'surface-hover': item.index % 2 === 0 }">
                {{ item.label }}
            </div>
        </ng-template>
    </p-virtualScroller>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';

interface Item {
    label: string;
    index: number;
}

@Component({
    selector: 'virtual-scroller-basic-demo',
    templateUrl: './virtual-scroller-basic-demo.html'
})
export class VirtualScrollerBasicDemo implements OnInit {
    items: Item[] = [];

    ngOnInit(): void {
        for (let i = 0; i < 10000; i++) {
            this.items.push({ label: 'Item #' + i, index: i });
        }
    }
}`
    };
}

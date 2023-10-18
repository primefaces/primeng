import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'virtual-scroll-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                VirtualScrolling is an efficient way of rendering the options by displaying a small subset of data in the viewport at any time. When dealing with huge number of options, it is suggested to enable VirtualScrolling to avoid performance
                issues. Usage is simple as setting <i>virtualScroll</i> property to true and defining <i>virtualScrollItemSize</i> to specify the height of an item.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-multiSelect
                [options]="virtualItems"
                [showToggleAll]="false"
                [(ngModel)]="selectedItems"
                optionLabel="name"
                [virtualScroll]="true"
                [filter]="true"
                [virtualScrollItemSize]="43"
                class="multiselect-custom-virtual-scroll"
                placeholder="Select Cities"
            ></p-multiSelect>
        </div>
        <app-code [code]="code" selector="multi-select-virtual-scroll-demo"></app-code>
    </section>`
})
export class VirtualScrollDoc {
    @Input() id: string;

    @Input() title: string;

    virtualItems!: any[];

    selectedItems!: any[];

    constructor() {
        this.virtualItems = [];
        for (let i = 0; i < 10000; i++) {
            this.virtualItems.push({ name: 'Item ' + i, code: 'Item ' + i });
        }
    }

    code: Code = {
        basic: `
<p-multiSelect [options]="virtualItems" [showToggleAll]="false" [(ngModel)]="selectedItems" optionLabel="name" [virtualScroll]="true" [filter]="true" [virtualScrollItemSize]="43" class="multiselect-custom-virtual-scroll" placeholder="Select Cities"></p-multiSelect>`,

        html: `
<div class="card flex justify-content-center">
    <p-multiSelect [options]="virtualItems" [showToggleAll]="false" [(ngModel)]="selectedItems" optionLabel="name" [virtualScroll]="true" [filter]="true" [virtualScrollItemSize]="43" class="multiselect-custom-virtual-scroll" placeholder="Select Cities"></p-multiSelect>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'multi-select-virtual-scroll-demo',
    templateUrl: './multi-select-virtual-scroll-demo.html'
})
export class MultiSelectVirtualScrollDemo {

    virtualItems!: any[];

    selectedItems!: any[];

    constructor() {
        this.virtualItems = [];
        for (let i = 0; i < 10000; i++) {
            this.virtualItems.push({ name: 'Item ' + i, code: 'Item ' + i });
        }
    }
}`
    };
}

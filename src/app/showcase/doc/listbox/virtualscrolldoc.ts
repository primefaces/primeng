import { Component, Input, OnInit } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'virtual-scroll-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                VirtualScrolling is an efficient way of rendering the options by displaying a small subset of data in the viewport at any time. When dealing with huge number of options, it is suggested to enable VirtualScrolling to avoid performance
                issues. Usage is simple as setting <i>virtualScroll</i> property to true and defining <i>virtualScrollItemSize</i> to specify the height of an item.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-listbox [options]="virtualItems" [(ngModel)]="selectedItems" optionLabel="name" [style]="{ width: '15rem' }" [virtualScroll]="true" [filter]="true" [virtualScrollItemSize]="43" [multiple]="true" [checkbox]="true" [showToggleAll]="false" [metaKeySelection]="false"></p-listbox>
        </div>
        <app-code [code]="code" selector="listbox-virtual-scroll-demo"></app-code>
    </section>`
})
export class VirtualScrollDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    virtualItems!: any[];

    selectedItems!: any[];

    ngOnInit() {
        this.virtualItems = [];
        for (let i = 0; i < 10000; i++) {
            this.virtualItems.push({ name: 'Item ' + i, code: 'Item ' + i });
        }
    }

    code: Code = {
        basic: `
<p-listbox [options]="virtualItems" [(ngModel)]="selectedItems" optionLabel="name" [style]="{ width: '15rem' }" [virtualScroll]="true" [filter]="true" [virtualScrollItemSize]="43" [multiple]="true" [checkbox]="true" [showToggleAll]="false" [metaKeySelection]="false"></p-listbox>`,

        html: `
<div class="card flex justify-content-center">
    <p-listbox [options]="virtualItems" [(ngModel)]="selectedItems" optionLabel="name" [style]="{ width: '15rem' }" [virtualScroll]="true" [filter]="true" [virtualScrollItemSize]="43" [multiple]="true" [checkbox]="true" [showToggleAll]="false" [metaKeySelection]="false"></p-listbox>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'listbox-virtual-scroll-demo',
    templateUrl: './listbox-virtual-scroll-demo.html'
})
export class ListboxVirtualScrollDemo implements OnInit {
    virtualItems!: any[];

    selectedItems!: any;

    ngOnInit() {
        this.virtualItems = [];
        for (let i = 0; i < 10000; i++) {
            this.virtualItems.push({ name: 'Item ' + i, code: 'Item ' + i });
        }
    }

}`
    };
}

import { Component, Input } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'dropdown-virtualscroll-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                VirtualScrolling is an efficient way of rendering the options by displaying a small subset of data in the viewport at any time. When dealing with huge number of options, it is suggested to enable VirtualScrolling to avoid performance
                issues. Usage is simple as setting <i>virtualScroll</i> property to true and defining <i>virtualScrollItemSize</i> to specify the height of an item.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-dropdown [options]="items" [(ngModel)]="selectedItem" placeholder="Select Item" [virtualScroll]="true" [virtualScrollItemSize]="38"></p-dropdown>
        </div>
        <app-code [code]="code" selector="dropdown-virtualscroll-demo"></app-code>
    </section>`
})
export class VirtualScrollDoc {
    @Input() id: string;

    @Input() title: string;

    items: SelectItem[];

    selectedItem: string;

    constructor() {
        this.items = [];
        for (let i = 0; i < 10000; i++) {
            this.items.push({ label: 'Item ' + i, value: 'Item ' + i });
        }
    }

    code: Code = {
        basic: `
<p-dropdown [options]="items" [(ngModel)]="selectedItem" placeholder="Select Item" 
    [virtualScroll]="true" [virtualScrollItemSize]="38"></p-dropdown>`,

        html: `
<div class="card flex justify-content-center">
    <p-dropdown [options]="items" [(ngModel)]="selectedItem" placeholder="Select Item" [virtualScroll]="true" [virtualScrollItemSize]="38"></p-dropdown>
</div>`,

        typescript: `
import { SelectItem } from 'primeng/api';
import { Component } from '@angular/core';

@Component({
    selector: 'dropdown-virtualscroll-demo',
    templateUrl: './dropdown-virtualscroll-demo.html'
})
export class DropdownVirtualscrollDemo {
    items: SelectItem[];
    
    selectedItem: string;

    constructor() {
        this.items = [];
        for (let i = 0; i < 10000; i++) {
            this.items.push({ label: 'Item ' + i, value: 'Item ' + i });
        }
    }
}`
    };
}

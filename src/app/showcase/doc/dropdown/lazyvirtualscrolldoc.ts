import { Component } from '@angular/core';
import { ScrollerOptions, SelectItem } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'dropdown-lazy-virtualscroll-demo',
    template: `
        <app-docsectiontext>
            <p>
                VirtualScrolling is an efficient way of rendering the options by displaying a small subset of data in the viewport at any time. When dealing with huge number of options, it is suggested to enable VirtualScrolling to avoid performance
                issues. Usage is simple as setting <i>virtualScroll</i> property to true and defining <i>virtualScrollItemSize</i> to specify the height of an item.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-dropdown  [options]="items" [(ngModel)]="selectedItem" placeholder="Select Item" [virtualScroll]="true" [virtualScrollItemSize]="38" [virtualScrollOptions]="options" ></p-dropdown>
        </div>
        <app-code [code]="code" selector="dropdown-lazy-virtualscroll-demo"></app-code>
    `
})
export class LazyVirtualScrollDoc {
    items: SelectItem[];

    selectedItem: string | undefined;

    loading : boolean = false

    loadLazyTimeout = null
    
    options: ScrollerOptions = {
        delay: 3000,
        showLoader: true
    };
 
    constructor() {
        this.items = [];
        for (let i = 0; i < 10000; i++) {
            this.items.push({ label: 'Item ' + i, value: 'Item ' + i });
        }
    }
    onLazyLoad(event) {
        this.loading = true;

        if (this.loadLazyTimeout) {
            clearTimeout(this.loadLazyTimeout);
        }

        //imitate delay of a backend call
        this.loadLazyTimeout = setTimeout(() => {
            const { first, last } = event;
            const items = [...this.items];

            for (let i = first; i < last; i++) {
                items[i] = { label: `Item #${i}`, value: i };
            }

            this.items = items;
            this.loading = false;
        }, Math.random() * 1000 + 250);
    }

    code: Code = {
        basic: `<p-dropdown [options]="items" [(ngModel)]="selectedItem" placeholder="Select Item" 
    [virtualScroll]="true" [virtualScrollItemSize]="38"></p-dropdown>`,

        html: `
<div class="card flex justify-content-center">
    <p-dropdown [options]="items" [(ngModel)]="selectedItem" placeholder="Select Item" [virtualScroll]="true" [virtualScrollItemSize]="38"></p-dropdown>
</div>`,

        typescript: `
import { SelectItem } from 'primeng/api';
import { Component } from '@angular/core';

@Component({
    selector: 'dropdown-lazy-virtualscroll-demo',
    templateUrl: './dropdown-lazy-virtualscroll-demo.html'
})
export class DropdownLazyVirtualscrollDemo {
    items: SelectItem[];
    
    selectedItem: string | undefined;

    constructor() {
        this.items = [];
        for (let i = 0; i < 10000; i++) {
            this.items.push({ label: 'Item ' + i, value: 'Item ' + i });
        }
    }
}`
    };
}

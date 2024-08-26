import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'select-virtualscroll-demo',
    template: `
        <app-docsectiontext>
            <p>
                VirtualScrolling is an efficient way of rendering the options by displaying a small subset of data in the viewport at any time. When dealing with huge number of options, it is suggested to enable VirtualScrolling to avoid performance
                issues. Usage is simple as setting <i>virtualScroll</i> property to true and defining <i>virtualScrollItemSize</i> to specify the height of an item.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-select [options]="items" [(ngModel)]="selectedItem" placeholder="Select Item" [virtualScroll]="true" [virtualScrollItemSize]="38" />
        </div>
        <app-code [code]="code" selector="select-virtualscroll-demo"></app-code>
    `
})
export class VirtualScrollDoc {
    items: SelectItem[];

    selectedItem: string | undefined;

    constructor() {
        this.items = [];
        for (let i = 0; i < 10000; i++) {
            this.items.push({ label: 'Item ' + i, value: 'Item ' + i });
        }
    }

    code: Code = {
        basic: `<p-select 
    [options]="items" 
    [(ngModel)]="selectedItem" 
    placeholder="Select Item" 
    [virtualScroll]="true"
    [virtualScrollItemSize]="38" />`,

        html: `<div class="card flex justify-center">
    <p-select 
        [options]="items"
        [(ngModel)]="selectedItem"
        placeholder="Select Item"
        [virtualScroll]="true"
        [virtualScrollItemSize]="38" />
</div>`,

        typescript: `import { SelectItem } from 'primeng/api';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'select-virtualscroll-demo',
    templateUrl: './select-virtualscroll-demo.html',
    standalone: true,
    imports: [FormsModule, SelectModule]
})
export class SelectVirtualscrollDemo {
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

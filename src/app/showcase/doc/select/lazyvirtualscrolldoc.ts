import { Component } from '@angular/core';
import { ScrollerOptions, SelectItem } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'select-lazy-virtualscroll-demo',
    template: `
        <div class="card flex justify-center">
            <p-select [options]="items" [(ngModel)]="selectedItem" placeholder="Select Item" [virtualScroll]="true" [virtualScrollItemSize]="38" [virtualScrollOptions]="options" />
        </div>
        <app-code [code]="code" selector="select-lazy-virtualscroll-demo"></app-code>
    `
})
export class LazyVirtualScrollDoc {
    items: SelectItem[];

    selectedItem: string | undefined;

    loading: boolean = false;

    loadLazyTimeout = null;

    options: ScrollerOptions = {
        delay: 250,
        showLoader: true,
        lazy: true,
        onLazyLoad: this.onLazyLoad.bind(this)
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
        this.loadLazyTimeout = setTimeout(
            () => {
                const { first, last } = event;
                const items = [...this.items];

                for (let i = first; i < last; i++) {
                    items[i] = { label: `Item #${i}`, value: i };
                }

                this.items = items;
                this.loading = false;
            },
            Math.random() * 1000 + 250
        );
    }

    code: Code = {
        basic: `<p-select 
    [options]="items" 
    [(ngModel)]="selectedItem" 
    placeholder="Select Item" 
    [virtualScroll]="true" 
    [virtualScrollItemSize]="38" 
    [virtualScrollOptions]="options" />`,

        html: `<div class="card flex justify-center">
    <p-select 
        [options]="items"
        [(ngModel)]="selectedItem"
        placeholder="Select Item"
        [virtualScroll]="true"
        [virtualScrollItemSize]="38"
        [virtualScrollOptions]="options" />
</div>`,

        typescript: `import { SelectItem } from 'primeng/api';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'select-lazy-virtualscroll-demo',
    templateUrl: './select-lazy-virtualscroll-demo.html',
    standalone: true,
    imports: [FormsModule, SelectModule]
})
export class SelectLazyVirtualscrollDemo {
    items: SelectItem[];

    selectedItem: string | undefined;

    loading: boolean = false;

    loadLazyTimeout = null;

    options: ScrollerOptions = {
        delay: 250,
        showLoader: true,
        lazy: true,
        onLazyLoad: this.onLazyLoad.bind(this)
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
                items[i] = { label: \`Item #\${i}\`, value: i };
            }

            this.items = items;
            this.loading = false;
        }, Math.random() * 1000 + 250);
    }

}`
    };
}

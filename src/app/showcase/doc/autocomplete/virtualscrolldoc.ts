import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'autocomplete-virtual-scroll-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                Virtual scrolling is an efficient way of rendering the options by displaying a small subset of data in the viewport at any time. When dealing with huge number of options, it is suggested to enable virtual scrolling to avoid
                performance issues. Usage is simple as setting <i>virtualScroll</i> property to <i>true</i> and defining <i>virtualScrollItemSize</i> to specify the height of an item.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-autoComplete [(ngModel)]="selectedItem" [virtualScroll]="true" [suggestions]="filteredItems" [virtualScrollItemSize]="34" (completeMethod)="filterItems($event)" field="label" [dropdown]="true"> </p-autoComplete>
        </div>
        <app-code [code]="code" selector="autocomplete-virtual-scroll-demo"></app-code>
    </section>`
})
export class VirtualScrollDoc {
    @Input() id: string;

    @Input() title: string;

    selectedItem: any;

    filteredItems: any[];

    items: any[];

    filterItems(event) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            if (item.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(item);
            }
        }

        this.filteredItems = filtered;
    }

    ngOnInit() {
        this.items = [];
        for (let i = 0; i < 10000; i++) {
            this.items.push({ label: 'Item ' + i, value: 'Item ' + i });
        }
    }

    code: Code = {
        basic: `
<p-autoComplete [(ngModel)]="selectedItem" [virtualScroll]="true" [suggestions]="filteredItems" [virtualScrollItemSize]="34" (completeMethod)="filterItems($event)" field="label" [dropdown]="true"> </p-autoComplete>`,

        html: `
<div class="card flex justify-content-center">
    <p-autoComplete [(ngModel)]="selectedItem" [virtualScroll]="true" [suggestions]="filteredItems" [virtualScrollItemSize]="34" (completeMethod)="filterItems($event)" field="label" [dropdown]="true"> </p-autoComplete>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'autocomplete-virtual-scroll-demo',
    templateUrl: './autocomplete-virtual-scroll-demo.html'
})
export class AutocompleteVirtualScrollDemo {
    selectedItem: any;

    filteredItems: any[];

    items: any[];

    filterItems(event) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            if (item.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(item);
            }
        }

        this.filteredItems = filtered;
    }

    ngOnInit() {
        this.items = [];
        for (let i = 0; i < 10000; i++) {
            this.items.push({ label: 'Item ' + i, value: 'Item ' + i });
        }
    }
}`
    };
}

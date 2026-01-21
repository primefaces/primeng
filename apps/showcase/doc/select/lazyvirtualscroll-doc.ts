import { AppCode } from '@/components/doc/app.code';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScrollerOptions, SelectItem } from 'primeng/api';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'lazyvirtualscroll-doc',
    standalone: true,
    imports: [AppCode, FormsModule, SelectModule],
    template: `
        <div class="card flex justify-center">
            <p-select [options]="items" [(ngModel)]="selectedItem" placeholder="Select Item" [virtualScroll]="true" [virtualScrollItemSize]="32" [virtualScrollOptions]="options" class="w-full md:w-56" />
        </div>
        <app-code></app-code>
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
}

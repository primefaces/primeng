import { AppCode } from '@/components/doc/app.code';
import { Code } from '@/domain/code';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'select-lazy-virtualscroll-demo',
    standalone: true,
    imports: [AppCode, FormsModule, SelectModule],
    template: `
        <div class="card flex justify-center">
            <p-select [options]="items()" [(ngModel)]="selectedItem" placeholder="Select Item" [virtualScroll]="true" [virtualScrollItemSize]="32" [lazy]="true" (onLazyLoad)="onLazyLoad($event)" [loading]="loading()" class="w-full md:w-56" />
        </div>
        <app-code [code]="code" selector="select-lazy-virtualscroll-demo"></app-code>
    `
})
export class LazyVirtualScrollDoc {
    // Simulates backend database
    backendItems: SelectItem[] = Array.from({ length: 10000 }, (_, i) => ({ label: `Item #${i}`, value: i }));

    items = signal<SelectItem[] | null>(null);

    selectedItem: string | undefined;

    loading = signal<boolean>(false);

    loadLazyTimeout = null;

    currentFilter: string | null = null;

    onLazyLoad(event) {
        this.loading.set(true);

        if (this.loadLazyTimeout) {
            clearTimeout(this.loadLazyTimeout);
        }

        //imitate delay of a backend call
        this.loadLazyTimeout = setTimeout(
            () => {
                let { first, last, filter } = event;

                // Reset items when filter changes
                if (filter !== this.currentFilter) {
                    this.currentFilter = filter;
                    this.items.set(null);
                }

                // Simulate backend filtering
                const filteredBackendItems = filter ? this.backendItems.filter((item) => item.label.toLowerCase().includes(filter.toLowerCase())) : this.backendItems;

                // Create sparse array with correct size if null, otherwise copy existing
                const items = this.items() ?? (Array.from({ length: filteredBackendItems.length }) as SelectItem[]);

                // Populate only the requested range
                const slice = filteredBackendItems.slice(first, last);
                for (let i = 0; i < slice.length; i++) {
                    items[first + i] = slice[i];
                }

                this.items.set(items);
                this.loading.set(false);
            },
            Math.random() * 1000 + 250
        );
    }

    code: Code = {
        basic: `<p-select [options]="items()" [(ngModel)]="selectedItem" placeholder="Select Item" [virtualScroll]="true" [virtualScrollItemSize]="32" [lazy]="true" (onLazyLoad)="onLazyLoad($event)" [loading]="loading()" class="w-full md:w-56" />`,

        html: `<div class="card flex justify-center">
    <p-select [options]="items()" [(ngModel)]="selectedItem" placeholder="Select Item" [virtualScroll]="true" [virtualScrollItemSize]="32" [lazy]="true" (onLazyLoad)="onLazyLoad($event)" [loading]="loading()" class="w-full md:w-56" />
</div>`,

        typescript: `import { SelectItem } from 'primeng/api';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';

@Component({
    selector: 'select-lazy-virtualscroll-demo',
    templateUrl: './select-lazy-virtualscroll-demo.html',
    standalone: true,
    imports: [FormsModule, Select]
})
export class SelectLazyVirtualscrollDemo {
    // Simulates backend database
    backendItems: SelectItem[] = Array.from({ length: 10000 }, (_, i) => ({ label: \`Item #\${i}\`, value: i }));

    items = signal<SelectItem[] | null>(null);

    selectedItem: string | undefined;

    loading = signal<boolean>(false);

    loadLazyTimeout = null;

    currentFilter: string | null = null;

    onLazyLoad(event) {
        this.loading.set(true);

        if (this.loadLazyTimeout) {
            clearTimeout(this.loadLazyTimeout);
        }

        //imitate delay of a backend call
        this.loadLazyTimeout = setTimeout(() => {
            let { first, last, filter } = event;

            // Reset items when filter changes
            if (filter !== this.currentFilter) {
                this.currentFilter = filter;
                this.items.set(null);
            }

            // Simulate backend filtering
            const filteredBackendItems = filter
                ? this.backendItems.filter((item) => item.label.toLowerCase().includes(filter.toLowerCase()))
                : this.backendItems;

            // Create sparse array with correct size if null, otherwise copy existing
            const items = this.items() ?? (Array.from({ length: filteredBackendItems.length }) as SelectItem[]);

            // Populate only the requested range
            const slice = filteredBackendItems.slice(first, last);
            for (let i = 0; i < slice.length; i++) {
                items[first + i] = slice[i];
            }

            this.items.set(items);
            this.loading.set(false);
        }, Math.random() * 1000 + 250);
    }
}`
    };
}

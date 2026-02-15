import { Component, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { MultiSelect, MultiSelectModule } from 'primeng/multiselect';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'virtualscroll-doc',
    standalone: true,
    imports: [CommonModule, FormsModule, MultiSelectModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                VirtualScrolling is an efficient way of rendering the options by displaying a small subset of data in the viewport at any time. When dealing with huge number of options, it is suggested to enable VirtualScrolling to avoid performance
                issues. Usage is simple as setting <i>virtualScroll</i> property to true and defining <i>virtualScrollItemSize</i> to specify the height of an item. Enable <i>lazy</i> to load data from a backend on demand.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-multiselect
                [options]="items()"
                [showToggleAll]="true"
                [selectAll]="selectAll"
                [(ngModel)]="selectedItems"
                optionLabel="label"
                [virtualScroll]="true"
                [virtualScrollItemSize]="43"
                [lazy]="true"
                (onLazyLoad)="onLazyLoad($event)"
                [loading]="loading()"
                placeholder="Select Items"
                (onSelectAllChange)="onSelectAllChange($event)"
                [maxSelectedLabels]="3"
                class="w-full md:w-80"
                #ms
            >
                <ng-template #headercheckboxicon let-allSelected="checked" let-partialSelected="partialSelected">
                    <i class="pi pi-check" *ngIf="allSelected"></i>
                    <i class="pi pi-minus" *ngIf="partialSelected" [ngStyle]="{ color: 'var(--text-color)' }"></i>
                </ng-template>
            </p-multiselect>
        </div>
        <app-code></app-code>
    `
})
export class VirtualScrollDoc {
    @ViewChild('ms') ms: MultiSelect;

    // Simulates backend database
    backendItems: SelectItem[] = Array.from({ length: 10000 }, (_, i) => ({ label: `Item #${i}`, value: i }));

    items = signal<SelectItem[] | null>(null);

    selectedItems!: any[];

    selectAll: boolean = false;

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
                const items = this.items() ? [...this.items()] : (Array.from({ length: filteredBackendItems.length }) as SelectItem[]);

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

    onSelectAllChange(event) {
        this.selectedItems = event.checked ? [...this.ms.visibleOptions()] : [];
        this.selectAll = event.checked;
    }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'virtual-scroll-doc',
    standalone: true,
    imports: [FormsModule, ListboxModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                VirtualScrolling is an efficient way of rendering the options by displaying a small subset of data in the viewport at any time. When dealing with huge number of options, it is suggested to enable VirtualScrolling to avoid performance
                issues. Usage is simple as setting <i>virtualScroll</i> property to true and defining <i>virtualScrollItemSize</i> to specify the height of an item.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-listbox
                [options]="items"
                [(ngModel)]="selectedItems"
                [selectAll]="selectAll"
                [filter]="true"
                [checkbox]="true"
                optionLabel="label"
                [virtualScroll]="true"
                [virtualScrollItemSize]="40"
                [multiple]="true"
                [metaKeySelection]="false"
                (onSelectAllChange)="onSelectAllChange($event)"
                (onChange)="onChange($event)"
                scrollHeight="250px"
                [striped]="true"
                class="w-full md:w-56"
            />
        </div>
        <app-code selector="listbox-virtual-scroll-demo"></app-code>
    `
})
export class VirtualScrollDoc {
    items = Array.from({ length: 100000 }, (_, i) => ({ label: `Item #${i}`, value: i }));

    selectedItems!: any[];

    selectAll: boolean = false;

    onSelectAllChange(event) {
        this.selectedItems = event.checked ? [...this.items] : [];
        this.selectAll = event.checked;
    }

    onChange(event) {
        const { value } = event;
        if (value) this.selectAll = value.length === this.items.length;
    }
}

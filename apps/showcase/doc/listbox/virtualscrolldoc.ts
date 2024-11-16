import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'virtual-scroll-doc',
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
                optionLabel="label"
                [virtualScroll]="true"
                [virtualScrollItemSize]="38"
                [multiple]="true"
                [metaKeySelection]="false"
                (onSelectAllChange)="onSelectAllChange($event)"
                (onChange)="onChange($event)"
                scrollHeight="250px"
                [striped]="true"
                class="w-full md:w-56"
            />
        </div>
        <app-code [code]="code" selector="listbox-virtual-scroll-demo"></app-code>
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

    code: Code = {
        basic: `<p-listbox [options]="items" [(ngModel)]="selectedItems" [selectAll]="selectAll" optionLabel="label" [virtualScroll]="true" [virtualScrollItemSize]="38" [multiple]="true" [metaKeySelection]="false" (onSelectAllChange)="onSelectAllChange($event)" (onChange)="onChange($event)" scrollHeight="250px" [striped]="true" class="w-full md:w-56" />`,

        html: `<div class="card flex justify-center">
    <p-listbox [options]="items" [(ngModel)]="selectedItems" [selectAll]="selectAll" optionLabel="label" [virtualScroll]="true" [virtualScrollItemSize]="38" [multiple]="true" [metaKeySelection]="false" (onSelectAllChange)="onSelectAllChange($event)" (onChange)="onChange($event)" scrollHeight="250px" [striped]="true" class="w-full md:w-56" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Listbox } from 'primeng/listbox';

@Component({
    selector: 'listbox-virtual-scroll-demo',
    templateUrl: './listbox-virtual-scroll-demo.html',
    standalone: true,
    imports: [FormsModule, Listbox]
})
export class ListboxVirtualScrollDemo {
    items = Array.from({ length: 100000 }, (_, i) => ({ label: \`Item #\${i}\`, value: i }))

    selectedItems!: any[];

    selectAll = false;

    onSelectAllChange(event) {
        this.selectedItems = event.checked ? [...this.items] : [];
        this.selectAll = event.checked;
        event.updateModel(this.selectedItems, event.originalEvent)
    }

    onChange(event) {
        const { originalEvent, value } = event
        if(value) this.selectAll = value.length === this.items.length;
    }

}`
    };
}

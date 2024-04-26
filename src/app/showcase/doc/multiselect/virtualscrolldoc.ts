import { Component, ViewChild } from '@angular/core';
import { Code } from '../../domain/code';
import { MultiSelect } from 'primeng/multiselect';

@Component({
    selector: 'virtual-scroll-doc',
    template: `
        <app-docsectiontext>
            <p>
                VirtualScrolling is an efficient way of rendering the options by displaying a small subset of data in the viewport at any time. When dealing with huge number of options, it is suggested to enable VirtualScrolling to avoid performance
                issues. Usage is simple as setting <i>virtualScroll</i> property to true and defining <i>virtualScrollItemSize</i> to specify the height of an item.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-multiSelect
                [options]="items"
                [showToggleAll]="true"
                [selectAll]="selectAll"
                [(ngModel)]="selectedItems"
                optionLabel="label"
                [virtualScroll]="true"
                [filter]="true"
                [virtualScrollItemSize]="43"
                class="multiselect-custom-virtual-scroll"
                placeholder="Select Cities"
                (onSelectAllChange)="onSelectAllChange($event)"
                #ms
            >
                <ng-template pTemplate="headercheckboxicon" let-allSelected let-partialSelected="partialSelected">
                    <i class="pi pi-check" *ngIf="allSelected"></i>
                    <i class="pi pi-minus" *ngIf="partialSelected" [ngStyle]="{ color: 'var(--text-color)' }"></i>
                </ng-template>
            </p-multiSelect>
        </div>
        <app-code [code]="code" selector="multi-select-virtual-scroll-demo"></app-code>
    `
})
export class VirtualScrollDoc {
    @ViewChild('ms') ms: MultiSelect;

    items = Array.from({ length: 100000 }, (_, i) => ({ label: `Item #${i}`, value: i }));

    selectedItems!: any[];

    selectAll: boolean = false;

    onSelectAllChange(event) {
        this.selectedItems = event.checked ? [...this.ms.visibleOptions()] : [];
        this.selectAll = event.checked;
    }

    code: Code = {
        basic: `<p-multiSelect
    [options]="items"
    [showToggleAll]="true"
    [selectAll]="selectAll"
    [(ngModel)]="selectedItems"
    optionLabel="label"
    [virtualScroll]="true"
    [filter]="true"
    [virtualScrollItemSize]="43"
    class="multiselect-custom-virtual-scroll"
    placeholder="Select Cities"
    (onSelectAllChange)="onSelectAllChange($event)"
    #ms
>
    <ng-template pTemplate="headercheckboxicon" let-allSelected let-partialSelected="partialSelected">
        <i class="pi pi-check" *ngIf="allSelected"></i>
        <i class="pi pi-minus" *ngIf="partialSelected" [ngStyle]="{ color: 'var(--text-color)' }"></i>
    </ng-template>
</p-multiSelect>`,

        html: `
<div class="card flex justify-content-center">
    <p-multiSelect
        [options]="items"
        [showToggleAll]="true"
        [selectAll]="selectAll"
        [(ngModel)]="selectedItems"
        optionLabel="label"
        [virtualScroll]="true"
        [filter]="true"
        [virtualScrollItemSize]="43"
        class="multiselect-custom-virtual-scroll"
        placeholder="Select Cities"
        (onSelectAllChange)="onSelectAllChange($event)"
        #ms
        >
        <ng-template pTemplate="headercheckboxicon" let-allSelected let-partialSelected="partialSelected">
            <i class="pi pi-check" *ngIf="allSelected"></i>
            <i class="pi pi-minus" *ngIf="partialSelected" [ngStyle]="{ color: 'var(--text-color)' }"></i>
        </ng-template>
    </p-multiSelect>
</div>`,

        typescript: `
import { Component, ViewChild } from '@angular/core';
import { MultiSelect } from 'primeng/multiselect';

@Component({
    selector: 'multi-select-virtual-scroll-demo',
    templateUrl: './multi-select-virtual-scroll-demo.html'
})
export class MultiSelectVirtualScrollDemo {
    @ViewChild('ms') ms: MultiSelect;

    items = Array.from({ length: 100000 }, (_, i) => ({ label: \`Item #\${i}\`, value: i }))

    selectedItems!: any[];

    selectAll: boolean = false;

    onSelectAllChange(event) {
        this.selectedItems = event.checked ? [...this.ms.visibleOptions()] : [];
        this.selectAll = event.checked;
    }

}`
    };
}

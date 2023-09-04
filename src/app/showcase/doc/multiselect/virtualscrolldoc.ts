import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

interface Country {
    name: string;
    code: string;
}

@Component({
    selector: 'virtual-scroll-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                VirtualScrolling is an efficient way of rendering the options by displaying a small subset of data in the viewport at any time. When dealing with huge number of options, it is suggested to enable VirtualScrolling to avoid performance
                issues. Usage is simple as setting <i>virtualScroll</i> property to true and defining <i>virtualScrollItemSize</i> to specify the height of an item.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-multiSelect [options]="virtualCountries" [showToggleAll]="false" [(ngModel)]="selectedCountries" optionLabel="name" [virtualScroll]="true" [filter]="true" [virtualScrollItemSize]="43" class="multiselect-custom-virtual-scroll">
                <ng-template let-country pTemplate="item">
                    <div class="flex align-items-center gap-2">
                        <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + country.code.toLowerCase()" style="width: 18px" />
                        <div>{{ country.name }}</div>
                    </div>
                </ng-template>
            </p-multiSelect>
        </div>
        <app-code [code]="code" selector="multi-select-virtual-scroll-demo"></app-code>
    </section>`
})
export class VirtualScrollDoc {
    @Input() id: string;

    @Input() title: string;

    virtualCountries!: Country[];

    selectedCountries!: Country[];

    constructor() {
        this.virtualCountries = [];
        for (let i = 0; i < 10000; i++) {
            this.virtualCountries.push({ name: 'Item ' + i, code: 'Item ' + i });
        }
    }

    code: Code = {
        basic: `
<p-multiSelect [options]="virtualCountries" [showToggleAll]="false" [(ngModel)]="selectedCountries" optionLabel="name" [virtualScroll]="true" [filter]="true" [virtualScrollItemSize]="43" class="multiselect-custom-virtual-scroll">
    <ng-template let-country pTemplate="item">
        <div class="flex align-items-center gap-2">
            <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + country.code.toLowerCase()" style="width: 18px"/>
            <div>{{ country.name }}</div>
        </div>
    </ng-template>
</p-multiSelect>`,

        html: `
<div class="card flex justify-content-center">
    <p-multiSelect [options]="virtualCountries" [showToggleAll]="false" [(ngModel)]="selectedCountries" optionLabel="name" [virtualScroll]="true" [filter]="true" [virtualScrollItemSize]="43" class="multiselect-custom-virtual-scroll">
        <ng-template let-country pTemplate="item">
            <div class="flex align-items-center gap-2">
                <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + country.code.toLowerCase()" style="width: 18px"/>
                <div>{{ country.name }}</div>
            </div>
        </ng-template>
    </p-multiSelect>
</div>`,

        typescript: `
import { Component } from '@angular/core';

interface Country {
    name: string;
    code: string;
}

@Component({
    selector: 'multi-select-virtual-scroll-demo',
    templateUrl: './multi-select-virtual-scroll-demo.html'
})
export class MultiSelectVirtualScrollDemo {
    virtualCountries!: Country[];

    selectedCountries!: Country[];

    constructor() {
        this.virtualCountries = []
        for (let i = 0; i < 10000; i++) {
            this.virtualCountries.push({ name: 'Item ' + i, code: 'Item ' + i });
        }
    }
}`
    };
}

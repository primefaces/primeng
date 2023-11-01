import { Component, Input } from '@angular/core';
import { SelectItemGroup } from 'primeng/api';
import { Code } from '../../domain/code';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'group-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                Options can be grouped when a nested data structures is provided.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-multiSelect [options]="groupedCities" [group]="true" [(ngModel)]="selectedCities" placeholder="Select Cities" scrollHeight="250px" display="chip">
                <ng-template let-group pTemplate="group">
                    <div class="flex align-items-center">
                        <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'mr-2 flag flag-' + group.value" style="width: 20px" />
                        <span>{{ group.label }}</span>
                    </div>
                </ng-template>
            </p-multiSelect>
        </div>
        <app-code [code]="code" selector="multi-select-group-demo"></app-code>
    </section>`
})
export class GroupDoc {
    @Input() id: string;

    @Input() title: string;

    groupedCities!: SelectItemGroup[];

    selectedCities!: City[];

    constructor() {
        this.groupedCities = [
            {
                label: 'Germany',
                value: 'de',
                items: [
                    { label: 'Berlin', value: 'Berlin' },
                    { label: 'Frankfurt', value: 'Frankfurt' },
                    { label: 'Hamburg', value: 'Hamburg' },
                    { label: 'Munich', value: 'Munich' }
                ]
            },
            {
                label: 'USA',
                value: 'us',
                items: [
                    { label: 'Chicago', value: 'Chicago' },
                    { label: 'Los Angeles', value: 'Los Angeles' },
                    { label: 'New York', value: 'New York' },
                    { label: 'San Francisco', value: 'San Francisco' }
                ]
            },
            {
                label: 'Japan',
                value: 'jp',
                items: [
                    { label: 'Kyoto', value: 'Kyoto' },
                    { label: 'Osaka', value: 'Osaka' },
                    { label: 'Tokyo', value: 'Tokyo' },
                    { label: 'Yokohama', value: 'Yokohama' }
                ]
            }
        ];
    }

    code: Code = {
        basic: `
<p-multiSelect [options]="groupedCities" [group]="true" [(ngModel)]="selectedCities" placeholder="Select Cities" scrollHeight="250px" display="chip">
    <ng-template let-group pTemplate="group">
        <div class="flex align-items-center">
            <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'mr-2 flag flag-' + group.value" style="width: 20px" />
            <span>{{ group.label }}</span>
        </div>
    </ng-template>
</p-multiSelect>`,

        html: `
<div class="card flex justify-content-center">
    <p-multiSelect [options]="groupedCities" [group]="true" [(ngModel)]="selectedCities" placeholder="Select Cities" scrollHeight="250px" display="chip">
        <ng-template let-group pTemplate="group">
            <div class="flex align-items-center">
                <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'mr-2 flag flag-' + group.value" style="width: 20px" />
                <span>{{ group.label }}</span>
            </div>
        </ng-template>
    </p-multiSelect>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { SelectItemGroup } from 'primeng/api';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'multi-select-group-demo',
    templateUrl: './multi-select-group-demo.html'
})
export class MultiSelectGroupDemo {
    groupedCities!: SelectItemGroup[];

    selectedCities!: City[];

    constructor() {
        this.groupedCities = [
            {
                label: 'Germany',
                value: 'de',
                items: [
                    { label: 'Berlin', value: 'Berlin' },
                    { label: 'Frankfurt', value: 'Frankfurt' },
                    { label: 'Hamburg', value: 'Hamburg' },
                    { label: 'Munich', value: 'Munich' }
                ]
            },
            {
                label: 'USA',
                value: 'us',
                items: [
                    { label: 'Chicago', value: 'Chicago' },
                    { label: 'Los Angeles', value: 'Los Angeles' },
                    { label: 'New York', value: 'New York' },
                    { label: 'San Francisco', value: 'San Francisco' }
                ]
            },
            {
                label: 'Japan',
                value: 'jp',
                items: [
                    { label: 'Kyoto', value: 'Kyoto' },
                    { label: 'Osaka', value: 'Osaka' },
                    { label: 'Tokyo', value: 'Tokyo' },
                    { label: 'Yokohama', value: 'Yokohama' }
                ]
            }
        ];
    }
}`
    };
}

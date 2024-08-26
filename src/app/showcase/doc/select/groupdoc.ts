import { Component } from '@angular/core';
import { SelectItemGroup } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'select-group-demo',
    template: `
        <app-docsectiontext>
            <p>Options can be grouped when a nested data structures is provided.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-select [options]="groupedCities" [(ngModel)]="selectedCity" placeholder="Select a City" [group]="true">
                <ng-template let-group pTemplate="group">
                    <div class="flex items-center">
                        <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'mr-2 flag flag-' + group.value" style="width: 20px" />
                        <span>{{ group.label }}</span>
                    </div>
                </ng-template>
            </p-select>
        </div>
        <app-code [code]="code" selector="select-group-demo"></app-code>
    `
})
export class GroupDoc {
    groupedCities: SelectItemGroup[];

    selectedCity: string | undefined;

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
        basic: `<p-select 
    [options]="groupedCities" 
    [(ngModel)]="selectedCity" 
    placeholder="Select a City" 
    [group]="true">
    <ng-template let-group pTemplate="group">
        <div class="flex items-center">
            <img 
                src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png"
                [class]="'mr-2 flag flag-' + group.value"
                style="width: 20px" />
            <span>{{ group.label }}</span>
        </div>
    </ng-template>
</p-select>`,

        html: `<div class="card flex justify-center">
    <p-select 
        [options]="groupedCities" 
        [(ngModel)]="selectedCity" 
        placeholder="Select a City" 
        [group]="true">
            <ng-template let-group pTemplate="group">
                <div class="flex items-center">
                    <img 
                        src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png"
                        [class]="'mr-2 flag flag-' + group.value" 
                        style="width: 20px" />
                    <span>{{ group.label }}</span>
                </div>
            </ng-template>
    </p-select>
</div>`,

        typescript: `import { SelectItemGroup } from 'primeng/api';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'select-group-demo',
    templateUrl: './select-group-demo.html',
    standalone: true,
    imports: [FormsModule, SelectModule]
})
export class SelectGroupDemo {
    groupedCities: SelectItemGroup[];

    selectedCity: string | undefined;

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

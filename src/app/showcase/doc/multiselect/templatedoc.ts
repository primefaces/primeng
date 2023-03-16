import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

interface Country {
    name: string;
    code: string;
}

@Component({
    selector: 'multiselect-template-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Available options and the selected options support templating with <i>pTemplate</i> properties respectively. In addition, header, footer and filter sections can be templated as well.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-multiSelect [options]="countries" [(ngModel)]="selectedCountries" defaultLabel="Select a Country" optionLabel="name" class="multiselect-custom">
                <ng-template let-value pTemplate="selectedItems">
                    <div class="country-item country-item-value" *ngFor="let option of selectedCountries1">
                        <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + option.code.toLowerCase()" />
                        <div>{{ option.name }}</div>
                    </div>
                    <div *ngIf="!selectedCountries1 || selectedCountries1.length === 0" class="country-placeholder">Select Countries</div>
                </ng-template>
                <ng-template let-country pTemplate="item">
                    <div class="country-item">
                        <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + country.code.toLowerCase()" />
                        <div>{{ country.name }}</div>
                    </div>
                </ng-template>
            </p-multiSelect>
        </div>
        <app-code [code]="code" selector="multiselect-template-demo"></app-code>
    </div>`
})
export class TemplateDoc {
    @Input() id: string;

    @Input() title: string;

    countries: Country[];

    selectedCountries: Country[];

    constructor() {
        this.countries = [
            { name: 'Australia', code: 'AU' },
            { name: 'Brazil', code: 'BR' },
            { name: 'China', code: 'CN' },
            { name: 'Egypt', code: 'EG' },
            { name: 'France', code: 'FR' },
            { name: 'Germany', code: 'DE' },
            { name: 'India', code: 'IN' },
            { name: 'Japan', code: 'JP' },
            { name: 'Spain', code: 'ES' },
            { name: 'United States', code: 'US' }
        ];
    }

    code: Code = {
        basic: `
<p-multiSelect [options]="countries" [(ngModel)]="selectedCountries" defaultLabel="Select a Country" optionLabel="name" class="multiselect-custom">
        <ng-template let-value pTemplate="selectedItems">
            <div class="country-item country-item-value" *ngFor="let option of selectedCountries1">
                <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + option.code.toLowerCase()" />
                <div>{{ option.name }}</div>
            </div>
            <div *ngIf="!selectedCountries1 || selectedCountries1.length === 0" class="country-placeholder">Select Countries</div>
        </ng-template>
        <ng-template let-country pTemplate="item">
            <div class="country-item">
                <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + country.code.toLowerCase()" />
                <div>{{ country.name }}</div>
            </div>
        </ng-template>
</p-multiSelect>`,

        html: `
<div class="card flex justify-content-center">
    <p-multiSelect [options]="countries" [(ngModel)]="selectedCountries" defaultLabel="Select a Country" optionLabel="name" class="multiselect-custom">
        <ng-template let-value pTemplate="selectedItems">
            <div class="country-item country-item-value" *ngFor="let option of selectedCountries1">
                <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + option.code.toLowerCase()" />
                <div>{{ option.name }}</div>
            </div>
            <div *ngIf="!selectedCountries1 || selectedCountries1.length === 0" class="country-placeholder">Select Countries</div>
        </ng-template>
        <ng-template let-country pTemplate="item">
            <div class="country-item">
                <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + country.code.toLowerCase()" />
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
    selector: 'multiselect-template-demo',
    templateUrl: './multiselect-template-demo.html',
    styleUrls: ['./multiselect-template-demo.scss']
})
export class MultiselectTemplateDemo {

    countries: Country[];

    selectedCountries: Country[];

    constructor() {
        this.countries = [
            { name: 'Australia', code: 'AU' },
            { name: 'Brazil', code: 'BR' },
            { name: 'China', code: 'CN' },
            { name: 'Egypt', code: 'EG' },
            { name: 'France', code: 'FR' },
            { name: 'Germany', code: 'DE' },
            { name: 'India', code: 'IN' },
            { name: 'Japan', code: 'JP' },
            { name: 'Spain', code: 'ES' },
            { name: 'United States', code: 'US' }
        ];

    }
}`
    };
}

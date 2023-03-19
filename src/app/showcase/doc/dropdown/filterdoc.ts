import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'dropdown-filter-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Dropdown provides built-in filtering that is enabled by adding the <i>filter</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-dropdown [options]="countries" [(ngModel)]="selectedCountry" optionLabel="name" [filter]="true" filterBy="name" [showClear]="true" placeholder="Select a Country">
                <ng-template pTemplate="selectedItem">
                    <div class="country-item country-item-value" *ngIf="selectedCountry">
                        <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + selectedCountry.code.toLowerCase()" />
                        <div>{{ selectedCountry.name }}</div>
                    </div>
                </ng-template>
                <ng-template let-country pTemplate="item">
                    <div class="country-item">
                        <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + country.code.toLowerCase()" />
                        <div>{{ country.name }}</div>
                    </div>
                </ng-template>
            </p-dropdown>
        </div>
        <app-code [code]="code" selector="dropdown-filter-demo"></app-code>
    </section>`
})
export class FilterDoc {
    @Input() id: string;

    @Input() title: string;

    countries: any[];

    selectedCountry: string;

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
<p-dropdown [options]="countries" [(ngModel)]="selectedCountry" optionLabel="name" [filter]="true" filterBy="name" [showClear]="true" placeholder="Select a Country">
    <ng-template pTemplate="selectedItem">
        <div class="country-item country-item-value" *ngIf="selectedCountry">
            <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + selectedCountry.code.toLowerCase()" />
            <div>{{ selectedCountry.name }}</div>
        </div>
    </ng-template>
    <ng-template let-country pTemplate="item">
        <div class="country-item">
            <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + country.code.toLowerCase()" />
            <div>{{ country.name }}</div>
        </div>
    </ng-template>
</p-dropdown>`,

        html: `
<div class="card flex justify-content-center">
    <p-dropdown [options]="countries" [(ngModel)]="selectedCountry" optionLabel="name" [filter]="true" filterBy="name" [showClear]="true" placeholder="Select a Country">
        <ng-template pTemplate="selectedItem">
            <div class="country-item country-item-value" *ngIf="selectedCountry">
                <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + selectedCountry.code.toLowerCase()" />
                <div>{{ selectedCountry.name }}</div>
            </div>
        </ng-template>
        <ng-template let-country pTemplate="item">
            <div class="country-item">
                <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + country.code.toLowerCase()" />
                <div>{{ country.name }}</div>
            </div>
        </ng-template>
    </p-dropdown>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'dropdown-filter-demo',
    templateUrl: './dropdown-filter-demo.html',
    styleUrls: ['./dropdown-filter-demo.scss']
})
export class DropdownFilterDemo {
    countries: any[];

    selectedCountry: string;

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

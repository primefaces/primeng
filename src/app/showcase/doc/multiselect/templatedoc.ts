import { Component, Input, OnInit } from '@angular/core';
import { Code } from '../../domain/code';

interface Country {
    name: string;
    code: string;
}

@Component({
    selector: 'template-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Available options and the selected options support templating with <i>pTemplate</i> properties respectively. In addition, header, footer and filter sections can be templated as well.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-multiSelect [options]="countries" [(ngModel)]="selectedCountries" defaultLabel="Select a Country" optionLabel="name">
                <ng-template let-value pTemplate="selectedItems">
                    <div class="flex align-items-center gap-2" *ngFor="let option of selectedCountries1">
                        <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + option.code.toLowerCase()" style="width: 18px" />
                        <div>{{ option.name }}</div>
                    </div>
                    <div *ngIf="!selectedCountries1 || selectedCountries1.length === 0">Select Countries</div>
                </ng-template>
                <ng-template let-country pTemplate="item">
                    <div class="flex align-items-center gap-2">
                        <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + country.code.toLowerCase()" style="width: 18px" />
                        <div>{{ country.name }}</div>
                    </div>
                </ng-template>
            </p-multiSelect>
        </div>
        <app-code [code]="code" selector="multi-select-template-demo"></app-code>
    </section>`
})
export class TemplateDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    countries: Country[];

    selectedCountries: Country[];

    ngOnInit() {
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
<p-multiSelect [options]="countries" [(ngModel)]="selectedCountries" defaultLabel="Select a Country" optionLabel="name" >
        <ng-template let-value pTemplate="selectedItems">
            <div class="flex align-items-center gap-2" *ngFor="let option of selectedCountries1">
                <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + option.code.toLowerCase()" style="width: 18px"/>
                <div>{{ option.name }}</div>
            </div>
            <div *ngIf="!selectedCountries1 || selectedCountries1.length === 0">Select Countries</div>
        </ng-template>
        <ng-template let-country pTemplate="item">
            <div class="flex align-items-center gap-2">
                <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + country.code.toLowerCase()" style="width: 18px"/>
                <div>{{ country.name }}</div>
            </div>
        </ng-template>
</p-multiSelect>`,

        html: `
<div class="card flex justify-content-center">
    <p-multiSelect [options]="countries" [(ngModel)]="selectedCountries" defaultLabel="Select a Country" optionLabel="name" >
        <ng-template let-value pTemplate="selectedItems">
            <div class="flex align-items-center gap-2" *ngFor="let option of selectedCountries1">
                <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + option.code.toLowerCase()" style="width: 18px"/>
                <div>{{ option.name }}</div>
            </div>
            <div *ngIf="!selectedCountries1 || selectedCountries1.length === 0">Select Countries</div>
        </ng-template>
        <ng-template let-country pTemplate="item">
            <div class="flex align-items-center gap-2">
                <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + country.code.toLowerCase()" style="width: 18px"/>
                <div>{{ country.name }}</div>
            </div>
        </ng-template>
    </p-multiSelect>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';

interface Country {
    name: string;
    code: string;
}

@Component({
    selector: 'multi-select-template-demo',
    templateUrl: './multi-select-template-demo.html'
})
export class MultiSelectTemplateDemo implements OnInit {
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

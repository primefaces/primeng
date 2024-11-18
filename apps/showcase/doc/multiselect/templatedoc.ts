import { Code } from '@/domain/code';
import { Component, OnInit } from '@angular/core';

interface Country {
    name: string;
    code: string;
}

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
            <p>Available options and the selected options support templating with <i>pTemplate</i> properties respectively. In addition, header, footer and filter sections can be templated as well.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-multiselect [options]="countries" [(ngModel)]="selectedCountries" placeholder="Select Countries" optionLabel="name" styleClass="w-full md:w-80" display="chip">
                <ng-template let-country pTemplate="item">
                    <div class="flex items-center gap-2">
                        <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + country.code.toLowerCase()" style="width: 18px" />
                        <div>{{ country.name }}</div>
                    </div>
                </ng-template>
                <ng-template pTemplate="dropdownicon">
                    <i class="pi pi-map"></i>
                </ng-template>
                <ng-template pTemplate="filtericon">
                    <i class="pi pi-map-marker"></i>
                </ng-template>
                <ng-template pTemplate="header">
                    <div class="font-medium px-3 py-2">Available Countries</div>
                </ng-template>
                <ng-template pTemplate="footer">
                    <div class="p-3 flex justify-between">
                        <p-button label="Add New" severity="secondary" text size="small" icon="pi pi-plus" />
                        <p-button label="Remove All" severity="danger" text size="small" icon="pi pi-times" />
                    </div>
                </ng-template>
            </p-multiselect>
        </div>
        <app-code [code]="code" selector="multi-select-template-demo"></app-code>
    `
})
export class TemplateDoc implements OnInit {
    countries!: Country[];

    selectedCountries!: Country[];

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
        basic: `<p-multiselect
    [options]="countries"
    [(ngModel)]="selectedCountries"
    placeholder="Select Countries"
    optionLabel="name"
    styleClass="w-full md:w-80"
    display="chip"
>
    <ng-template let-country pTemplate="item">
        <div class="flex items-center gap-2">
            <img
                src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png"
                [class]="'flag flag-' + country.code.toLowerCase()"
                style="width: 18px"
            />
            <div>{{ country.name }}</div>
        </div>
    </ng-template>
    <ng-template pTemplate="dropdownicon">
        <i class="pi pi-map"></i>
    </ng-template>
    <ng-template pTemplate="filtericon">
        <i class="pi pi-map-marker"></i>
    </ng-template>
    <ng-template pTemplate="header">
        <div class="font-medium px-3 py-2">Available Countries</div>
    </ng-template>
    <ng-template pTemplate="footer">
        <div class="p-3 flex justify-between">
            <p-button label="Add New" severity="secondary" text size="small" icon="pi pi-plus" />
            <p-button label="Remove All" severity="danger" text size="small" icon="pi pi-times" />
        </div>
    </ng-template>
</p-multiselect>`,

        html: `<div class="card flex justify-center">
    <p-multiselect
        [options]="countries"
        [(ngModel)]="selectedCountries"
        placeholder="Select Countries"
        optionLabel="name"
        styleClass="w-full md:w-80"
        display="chip"
    >
        <ng-template let-country pTemplate="item">
            <div class="flex items-center gap-2">
                <img
                    src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png"
                    [class]="'flag flag-' + country.code.toLowerCase()"
                    style="width: 18px"
                />
                <div>{{ country.name }}</div>
            </div>
        </ng-template>
        <ng-template pTemplate="dropdownicon">
            <i class="pi pi-map"></i>
        </ng-template>
        <ng-template pTemplate="filtericon">
            <i class="pi pi-map-marker"></i>
        </ng-template>
        <ng-template pTemplate="header">
            <div class="font-medium px-3 py-2">Available Countries</div>
        </ng-template>
        <ng-template pTemplate="footer">
            <div class="p-3 flex justify-between">
                <p-button label="Add New" severity="secondary" text size="small" icon="pi pi-plus" />
                <p-button label="Remove All" severity="danger" text size="small" icon="pi pi-times" />
            </div>
        </ng-template>
    </p-multiselect>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';

interface Country {
    name: string;
    code: string;
}

@Component({
    selector: 'multi-select-template-demo',
    templateUrl: './multi-select-template-demo.html',
    standalone: true,
    imports: [FormsModule, MultiSelectModule, ButtonModule]
})
export class MultiSelectTemplateDemo implements OnInit {
    countries!: Country[];

    selectedCountries!: Country[];

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

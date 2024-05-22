import { Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';

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
        <div class="card flex justify-content-center">
            <p-multiSelect [options]="countries" [(ngModel)]="selectedCountries" placeholder="Select Countries" optionLabel="name">
                <ng-template let-value pTemplate="selectedItems">
                    <div class="inline-flex align-items-center gap-2 px-1" *ngFor="let option of value">
                        <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + option.code.toLowerCase()" style="width: 18px" />
                        <div>{{ option.name }},</div>
                    </div>
                    <div *ngIf="!value || value.length === 0">Select Countries</div>
                </ng-template>
                <ng-template let-country pTemplate="item">
                    <div class="flex align-items-center gap-2">
                        <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + country.code.toLowerCase()" style="width: 18px" />
                        <div>{{ country.name }}</div>
                    </div>
                </ng-template>
                <ng-template let-country pTemplate="footer">
                    <div class="py-2 px-3">
                        <b>
                            {{ selectedCountries ? selectedCountries.length : 0 }}
                        </b>
                        item{{ (selectedCountries ? selectedCountries.length : 0) > 1 ? 's' : '' }} selected.
                    </div>
                </ng-template>
            </p-multiSelect>
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
        basic: `<p-multiSelect 
    [options]="countries" 
    [(ngModel)]="selectedCountries" 
    placeholder="Select Countries" 
    optionLabel="name">
        <ng-template let-value pTemplate="selectedItems">
            <div class="inline-flex align-items-center gap-2 px-1" *ngFor="let option of value">
                <img 
                    src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" 
                    [class]="'flag flag-' + option.code.toLowerCase()" 
                    style="width: 18px" />
                <div>{{ option.name }},</div>
            </div>
            <div *ngIf="!value || value.length === 0">Select Countries</div>
        </ng-template>
        <ng-template let-country pTemplate="item">
            <div class="flex align-items-center gap-2">
                <img 
                    src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" 
                    [class]="'flag flag-' + country.code.toLowerCase()" 
                    style="width: 18px" />
                <div>{{ country.name }}</div>
            </div>
        </ng-template>
        <ng-template let-country pTemplate="footer">
            <div class="py-2 px-3">
                <b>
                    {{ selectedCountries ? selectedCountries.length : 0 }}
                </b> 
                item{{ (selectedCountries ? selectedCountries.length : 0) > 1 ? 's' : '' }} selected.
            </div>
        </ng-template>
</p-multiSelect>`,

        html: `<div class="card flex justify-content-center">
    <p-multiSelect 
        [options]="countries" 
        [(ngModel)]="selectedCountries" 
        placeholder="Select a Country" 
        optionLabel="name">
            <ng-template let-value pTemplate="selectedItems">
                <div class="inline-flex align-items-center gap-2 px-1" *ngFor="let option of value">
                    <img 
                        src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" 
                        [class]="'flag flag-' + option.code.toLowerCase()" 
                        style="width: 18px" />
                    <div>{{ option.name }},</div>
                </div>
                <div *ngIf="!value || value.length === 0">Select Countries</div>
            </ng-template>
            <ng-template let-country pTemplate="item">
                <div class="flex align-items-center gap-2">
                    <img 
                        src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" 
                        [class]="'flag flag-' + country.code.toLowerCase()" 
                        style="width: 18px" />
                    <div>{{ country.name }}</div>
                </div>
            </ng-template>
            <ng-template let-country pTemplate="footer">
                <div class="py-2 px-3">
                    <b>
                    {{ selectedCountries ? selectedCountries.length : 0 }}
                    </b> 
                    item{{ (selectedCountries ? selectedCountries.length : 0) > 1 ? 's' : '' }} selected.
                </div>
            </ng-template>
    </p-multiSelect>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

interface Country {
    name: string;
    code: string;
}

@Component({
    selector: 'multi-select-template-demo',
    templateUrl: './multi-select-template-demo.html',
    standalone: true,
    imports: [FormsModule, MultiSelectModule]
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

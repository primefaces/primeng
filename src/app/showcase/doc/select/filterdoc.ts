import { Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'select-filter-demo',
    template: `
        <app-docsectiontext>
            <p>Select provides built-in filtering that is enabled by adding the <i>filter</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-select [options]="countries" [(ngModel)]="selectedCountry" optionLabel="name" [filter]="true" filterBy="name" [showClear]="true" placeholder="Select a Country">
                <ng-template pTemplate="selectedItem" let-selectedOption>
                    <div class="flex align-items-center gap-2">
                        <div>{{ selectedOption.name }}</div>
                    </div>
                </ng-template>
                <ng-template let-country pTemplate="item">
                    <div class="flex align-items-center gap-2">
                        <div>{{ country.name }}</div>
                    </div>
                </ng-template>
            </p-select>
        </div>
        <app-code [code]="code" selector="select-filter-demo"></app-code>
    `
})
export class FilterDoc implements OnInit {
    countries: any[] | undefined;

    selectedCountry: string | undefined;

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
        basic: `<p-select 
    [options]="countries"
    [(ngModel)]="selectedCountry"
    optionLabel="name"
    [filter]="true"
    filterBy="name" 
    [showClear]="true"
    placeholder="Select a Country">
        <ng-template pTemplate="selectedItem" let-selectedOption>
            <div class="flex align-items-center gap-2">
                <img 
                    src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png"
                    [class]="'flag flag-' + selectedCountry.code.toLowerCase()"
                    style="width: 18px" />
                <div>{{ selectedOption.name }}</div>
            </div>
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
</p-select>`,

        html: `<div class="card flex justify-content-center">
    <p-select 
        [options]="countries"
        [(ngModel)]="selectedCountry"
        optionLabel="name"
        [filter]="true"
        filterBy="name"
        [showClear]="true"
        placeholder="Select a Country">
            <ng-template pTemplate="selectedItem" let-selectedOption>
                <div class="flex align-items-center gap-2">
                    <img 
                        src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png"
                        [class]="'flag flag-' + selectedCountry.code.toLowerCase()"
                        style="width: 18px" />
                    <div>{{ selectedOption.name }}</div>
                </div>
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
    </p-select>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'select-filter-demo',
    templateUrl: './select-filter-demo.html',
    standalone: true,
    imports: [FormsModule, SelectModule]
})
export class SelectFilterDemo implements OnInit {
    countries: any[] | undefined;

    selectedCountry: string | undefined;

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
}`
    };
}

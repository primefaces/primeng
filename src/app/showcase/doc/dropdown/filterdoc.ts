import { Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'dropdown-filter-demo',
    template: `
        <app-docsectiontext>
            <p>Dropdown provides built-in filtering that is enabled by adding the <i>filter</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-dropdown [options]="countries" [(ngModel)]="selectedCountry" optionLabel="name" [filter]="true" filterBy="name" [showClear]="true" placeholder="Select a Country">
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
            </p-dropdown>
        </div>
        <app-code [code]="code" selector="dropdown-filter-demo"></app-code>
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
        basic: `<p-dropdown 
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
</p-dropdown>`,

        html: `<div class="card flex justify-content-center">
    <p-dropdown 
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
    </p-dropdown>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
    selector: 'dropdown-filter-demo',
    templateUrl: './dropdown-filter-demo.html',
    standalone: true,
    imports: [FormsModule, DropdownModule]
})
export class DropdownFilterDemo implements OnInit {
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

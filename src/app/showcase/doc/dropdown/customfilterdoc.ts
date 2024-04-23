import { Component, OnInit } from '@angular/core';
import { Code } from '../../domain/code';
import { DropdownFilterOptions } from 'primeng/dropdown';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'dropdown-custom-filter-demo',
    template: `
        <app-docsectiontext>
            <p>Custom filter can be applied with the <i>filterTemplate</i>.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-dropdown [options]="countries" [(ngModel)]="selectedCountry" optionLabel="name" [filter]="true" filterBy="name" [showClear]="true" placeholder="Select a Country">
                <ng-template pTemplate="filter" let-options="options">
                    <div class="flex gap-1">
                        <div class="p-inputgroup" (click)="$event.stopPropagation()">
                            <span class="p-inputgroup-addon"><i class="pi pi-search"></i></span>
                            <input type="text" pInputText placeholder="Filter" [(ngModel)]="filterValue" (keyup)="customFilterFunction($event, options)" />
                        </div>
                        <button pButton icon="pi pi-times" (click)="resetFunction(options)" severity="secondary"></button>
                    </div>
                </ng-template>
                <ng-template pTemplate="selectedItem" let-selectedOption>
                    <div class="flex align-items-center gap-2">
                        <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + selectedCountry.code.toLowerCase()" style="width: 18px" />
                        <div>{{ selectedOption.name }}</div>
                    </div>
                </ng-template>
                <ng-template let-country pTemplate="item">
                    <div class="flex align-items-center gap-2">
                        <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + country.code.toLowerCase()" style="width: 18px" />
                        <div>{{ country.name }}</div>
                    </div>
                </ng-template>
            </p-dropdown>
        </div>
        <app-code [code]="code" selector="dropdown-custom-filter-demo"></app-code>
    `
})
export class CustomFilterDoc implements OnInit {
    countries: City[] | undefined;

    selectedCountry: string | undefined;

    filterValue: string | undefined = '';

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

    resetFunction(options: DropdownFilterOptions) {
        options.reset();
        this.filterValue = '';
    }

    customFilterFunction(event: KeyboardEvent, options: DropdownFilterOptions) {
        options.filter(event);
    }

    code: Code = {
        basic: `<p-dropdown [options]="countries" [(ngModel)]="selectedCountry" optionLabel="name" [filter]="true" filterBy="name" [showClear]="true" placeholder="Select a Country" styleClass="w-20rem">
        <ng-template pTemplate="filter" let-options="options">
            <div class="flex gap-1">
                <div class="p-inputgroup" (click)="$event.stopPropagation()">
                    <span class="p-inputgroup-addon"><i class="pi pi-search"></i></span>
                    <input type="text" pInputText placeholder="Filter" [(ngModel)]="filterValue" (keyup)="customFilterFunction($event, options)" />
                </div>
                <button pButton icon="pi pi-times" (click)="resetFunction(options)" severity="secondary"></button>
            </div>
        </ng-template>
        <ng-template pTemplate="selectedItem" let-selectedOption>
            <div class="flex align-items-center gap-2">
                <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + selectedCountry.code.toLowerCase()" style="width: 18px" />
                <div>{{ selectedOption.name }}</div>
            </div>
        </ng-template>
        <ng-template let-country pTemplate="item">
            <div class="flex align-items-center gap-2">
                <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + country.code.toLowerCase()" style="width: 18px" />
                <div>{{ country.name }}</div>
            </div>
        </ng-template>
</p-dropdown>`,

        html: `<div class="card flex justify-content-center">
<p-dropdown [options]="countries" [(ngModel)]="selectedCountry" optionLabel="name" [filter]="true" filterBy="name" [showClear]="true" placeholder="Select a Country" styleClass="w-20rem">
    <ng-template pTemplate="filter" let-options="options">
        <div class="flex gap-1">
            <div class="p-inputgroup" (click)="$event.stopPropagation()">
                <span class="p-inputgroup-addon"><i class="pi pi-search"></i></span>
                <input type="text" pInputText placeholder="Filter" [(ngModel)]="filterValue" (keyup)="customFilterFunction($event, options)" />
            </div>
            <button pButton icon="pi pi-times" (click)="resetFunction(options)" severity="secondary"></button>
        </div>
    </ng-template>
    <ng-template pTemplate="selectedItem" let-selectedOption>
        <div class="flex align-items-center gap-2">
            <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + selectedCountry.code.toLowerCase()" style="width: 18px" />
            <div>{{ selectedOption.name }}</div>
        </div>
    </ng-template>
    <ng-template let-country pTemplate="item">
        <div class="flex align-items-center gap-2">
            <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + country.code.toLowerCase()" style="width: 18px" />
            <div>{{ country.name }}</div>
        </div>
    </ng-template>
</p-dropdown>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { DropdownFilterOptions } from 'primeng/dropdown';

interface City {
    name: string;
    code: string;
}
@Component({
    selector: 'dropdown-custom-filter-demo',
    templateUrl: './dropdown-custom-filter-demo.html'
})
export class DropdownCustomFilterDemo implements OnInit {
    countries: City[] | undefined;

    selectedCountry: string | undefined;

    filterValue: string | undefined = '';

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

    resetFunction(options: DropdownFilterOptions) {
        options.reset();
        this.filterValue = '';
    }

    customFilterFunction(event: KeyboardEvent, options: DropdownFilterOptions) {
        options.filter(event);
    }
}`
    };
}

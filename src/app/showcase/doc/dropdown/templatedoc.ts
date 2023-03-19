import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'dropdown-template-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                Both the selected option and the options list can be templated to provide customizated representation. Use <i>selectedItem</i> template to customize the selected label display and the <i>item</i> template to change the content of the
                options in the dropdown panel. In addition when grouping is enabled, <i>group</i> template is available to customize the option groups. All templates get the option instance as the default local template variable.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-dropdown [options]="countries" [(ngModel)]="selectedCountry" optionLabel="name" [showClear]="true" placeholder="Select a Country">
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
        <app-code [code]="code" selector="dropdown-template-demo"></app-code>
    </section>`
})
export class TemplateDoc {
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
<p-dropdown [options]="countries" [(ngModel)]="selectedCountry" optionLabel="name" [showClear]="true" placeholder="Select a Country">
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
    <p-dropdown [options]="countries" [(ngModel)]="selectedCountry" optionLabel="name" [showClear]="true" placeholder="Select a Country">
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
    selector: 'dropdown-template-demo',
    templateUrl: './dropdown-template-demo.html',
    styleUrls: ['./dropdown-template-demo.scss']
})
export class DropdownTemplateDemo {
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

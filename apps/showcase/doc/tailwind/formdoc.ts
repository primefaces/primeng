import { Component } from '@angular/core';

@Component({
    selector: 'form-doc',
    template: `
        <app-docsectiontext>
            <p>Using Tailwind utilities for the responsive layout of a form with PrimeNG components.</p>
        </app-docsectiontext>
        <div class="card flex sm:justify-center">
            <div class="flex flex-col gap-6 w-full sm:w-auto">
                <div class="flex flex-col sm:flex-row sm:items-center gap-6">
                    <div class="flex-auto">
                        <label for="firstname" class="block font-semibold mb-2">Firstname</label>
                        <input type="text" pInputText id="firstname" class="w-full" />
                    </div>
                    <div class="flex-auto">
                        <label for="lastname" class="block font-semibold mb-2">Lastname</label>
                        <input type="text" pInputText id="lastname" class="w-full" />
                    </div>
                </div>
                <div class="flex flex-col sm:flex-row sm:items-center gap-6">
                    <div class="flex-1">
                        <label for="date" class="block font-semibold mb-2">Date</label>
                        <p-datepicker inputId="date" class="w-full" />
                    </div>
                    <div class="flex-1">
                        <label for="country" class="block font-semibold mb-2">Country</label>
                        <p-select [options]="countries" [(ngModel)]="selectedCountry" optionLabel="name" [showClear]="true" placeholder="Select a Country">
                            <ng-template pTemplate="selectedItem">
                                <div class="flex items-center gap-2" *ngIf="selectedCountry">
                                    <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + selectedCountry.code.toLowerCase()" style="width: 18px" />
                                    <div>{{ selectedCountry.name }}</div>
                                </div>
                            </ng-template>
                            <ng-template let-country pTemplate="item">
                                <div class="flex items-center gap-2">
                                    <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + country.code.toLowerCase()" style="width: 18px" />
                                    <div>{{ country.name }}</div>
                                </div>
                            </ng-template>
                        </p-select>
                    </div>
                </div>
                <div class="flex-auto">
                    <label for="message" class="block font-semibold mb-2">Message</label>
                    <textarea pTextarea id="message" class="w-full" rows="4"></textarea>
                </div>
            </div>
        </div>
        <app-code [code]="code" selector="code" [hideToggleCode]="true" [hideCodeSandbox]="true" [hideStackBlitz]="true"></app-code>
    `
})
export class FormDoc {
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

    code: {
        basic: `<div class="flex flex-col gap-6 w-full sm:w-auto">
    <div class="flex flex-col sm:flex-row sm:items-center gap-6">
        <div class="flex-auto">
            <label for="firstname" class="block font-semibold mb-2">Firstname</label>
            <input type="text" pInputText id="firstname" class="w-full" />
        </div>
        <div class="flex-auto">
            <label for="lastname" class="block font-semibold mb-2">Lastname</label>
            <input type="text" pInputText id="lastname" class="w-full" />
        </div>
    </div>
    <div class="flex flex-col sm:flex-row sm:items-center gap-6">
        <div class="flex-1">
            <label for="date" class="block font-semibold mb-2">Date</label>
            <p-datepicker inputId="date" class="w-full" />
        </div>
        <div class="flex-1">
            <label for="country" class="block font-semibold mb-2">Country</label>
            <p-select
                [options]="countries"
                [(ngModel)]="selectedCountry"
                optionLabel="name"
                [showClear]="true"
                placeholder="Select a Country"
            >
                <ng-template pTemplate="selectedItem">
                    <div class="flex items-center gap-2" *ngIf="selectedCountry">
                        <img
                            src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png"
                            [class]="'flag flag-' + selectedCountry.code.toLowerCase()"
                            style="width: 18px"
                        />
                        <div>{{ selectedCountry.name }}</div>
                    </div>
                </ng-template>
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
            </p-select>
        </div>
    </div>
    <div class="flex-auto">
        <label for="message" class="block font-semibold mb-2">Message</label>
        <textarea pTextarea id="message" class="w-full" rows="4"></textarea>
    </div>
</div>`;
    };
}

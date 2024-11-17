import { Code } from '@/domain/code';
import { CountryService } from '@/service/countryservice';
import { Component } from '@angular/core';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-template-demo',
    template: ` <app-docsectiontext>
            <p>AutoComplete offers multiple templates for customization through templating.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-autocomplete [(ngModel)]="selectedCountryAdvanced" [suggestions]="filteredCountries" (completeMethod)="filterCountry($event)" optionLabel="name">
                <ng-template let-country #item>
                    <div class="flex items-center gap-2">
                        <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + country.code.toLowerCase()" style="width: 18px" />
                        <div>{{ country.name }}</div>
                    </div>
                </ng-template>
                <ng-template #header>
                    <div class="font-medium px-3 py-2">Available Countries</div>
                </ng-template>
                <ng-template #footer>
                    <div class="px-3 py-3">
                        <p-button label="Add New" fluid severity="secondary" text size="small" icon="pi pi-plus" />
                    </div>
                </ng-template>
            </p-autocomplete>
        </div>
        <app-code [code]="code" selector="autocomplete-template-demo"></app-code>`
})
export class TemplateDoc {
    countries: any[] | undefined;

    selectedCountryAdvanced: any[] | undefined;

    filteredCountries: any[] | undefined;

    constructor(private countryService: CountryService) {}

    ngOnInit() {
        this.countryService.getCountries().then((countries) => {
            this.countries = countries;
        });
    }

    filterCountry(event: AutoCompleteCompleteEvent) {
        let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < (this.countries as any[]).length; i++) {
            let country = (this.countries as any[])[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }
        this.filteredCountries = filtered;
    }

    code: Code = {
        basic: `<p-autocomplete [(ngModel)]="selectedCountryAdvanced" [suggestions]="filteredCountries" (completeMethod)="filterCountry($event)" optionLabel="name">
    <ng-template let-country #item>
        <div class="flex items-center gap-2">
            <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + country.code.toLowerCase()" style="width: 18px" />
            <div>{{ country.name }}</div>
        </div>
    </ng-template>
    <ng-template #header>
        <div class="font-medium px-3 py-2">Available Countries</div>
    </ng-template>
    <ng-template #footer>
        <div class="px-3 py-3">
            <p-button label="Add New" fluid severity="secondary" text size="small" icon="pi pi-plus" />
        </div>
    </ng-template>
</p-autocomplete>`,

        html: `<div class="card flex justify-center">
    <p-autocomplete [(ngModel)]="selectedCountryAdvanced" [suggestions]="filteredCountries" (completeMethod)="filterCountry($event)" optionLabel="name">
        <ng-template let-country #item>
            <div class="flex items-center gap-2">
                <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + country.code.toLowerCase()" style="width: 18px" />
                <div>{{ country.name }}</div>
            </div>
        </ng-template>
        <ng-template #header>
            <div class="font-medium px-3 py-2">Available Countries</div>
        </ng-template>
        <ng-template #footer>
            <div class="px-3 py-3">
                <p-button label="Add New" fluid severity="secondary" text size="small" icon="pi pi-plus" />
            </div>
        </ng-template>
    </p-autocomplete>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { SelectItemGroup } from 'primeng/api';
import { CountryService } from '@/service/countryservice';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-template-demo',
    templateUrl: './autocomplete-template-demo.html',
    standalone: true,
    imports: [FormsModule, AutoCompleteModule, ButtonModule],
    providers: [CountryService]
})
export class AutocompleteTemplateDemo {
    countries: any[] | undefined;

    selectedCountryAdvanced: any[] | undefined;

    filteredCountries: any[] | undefined;

    constructor(private countryService: CountryService) {}

    ngOnInit() {
        this.countryService.getCountries().then((countries) => {
            this.countries = countries;
        });
    }

    filterCountry(event: AutoCompleteCompleteEvent) {
        let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < (this.countries as any[]).length; i++) {
            let country = (this.countries as any[])[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredCountries = filtered;
    }
}`,

        service: ['CountryService'],

        data: `
//CountryService
{
    "name": "Afghanistan",
    "code": "AF"
}
...`
    };
}

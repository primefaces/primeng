import { Component, Input } from '@angular/core';
import { SelectItemGroup } from 'primeng/api';
import { Code } from '../../domain/code';
import { CountryService } from '../../service/countryservice';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-template-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p><i>item</i> template allows displaying custom content inside the suggestions panel. The local ng-template variable passed to the ng-template is an object in the suggestions array.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-autoComplete [(ngModel)]="selectedCountryAdvanced" [suggestions]="filteredCountries" (completeMethod)="filterCountry($event)" field="name" [dropdown]="true">
                <ng-template let-country pTemplate="item">
                    <div class="flex align-items-center gap-2">
                        <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + country.code.toLowerCase()" style="width: 18px" />
                        <div>{{ country.name }}</div>
                    </div>
                </ng-template>
            </p-autoComplete>
        </div>
        <app-code [code]="code" selector="autocomplete-template-demo"></app-code>
    </section>`
})
export class TemplateDoc {
    @Input() id: string;

    @Input() title: string;

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
        basic: `
<p-autoComplete [(ngModel)]="selectedCountryAdvanced" [suggestions]="filteredCountries" 
    (completeMethod)="filterCountry($event)" field="name" [dropdown]="true">
        <ng-template let-country pTemplate="item">
            <div class="flex align-items-center gap-2">
                <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + country.code.toLowerCase()" style="width: 18px"/>
                <div>{{ country.name }}</div>
            </div>
        </ng-template>
</p-autoComplete>`,

        html: `
<div class="card flex justify-content-center">
    <p-autoComplete [(ngModel)]="selectedCountryAdvanced" [suggestions]="filteredCountries" (completeMethod)="filterCountry($event)" field="name" [dropdown]="true">
        <ng-template let-country pTemplate="item">
            <div class="flex align-items-center gap-2">
                <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + country.code.toLowerCase()" style="width: 18px"/>
                <div>{{ country.name }}</div>
            </div>
        </ng-template>
    </p-autoComplete>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { SelectItemGroup } from 'primeng/api';
import { CountryService } from 'src/service/countryservice';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-template-demo',
    templateUrl: './autocomplete-template-demo.html',
    styleUrls: ['./autocomplete-template-demo.scss']
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

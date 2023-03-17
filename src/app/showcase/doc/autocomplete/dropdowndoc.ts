import { Component, Input, OnInit } from '@angular/core';
import { Code } from '../../domain/code';
import { CountryService } from '../../service/countryservice';

@Component({
    selector: 'autocomplete-dropdown-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                Enabling <i>dropdown</i> property displays a button next to the input field where click behavior of the button is defined using dropdownMode property that takes "blank" or "current" as possible values. "blank" is the default mode to
                send a query with an empty string whereas "current" setting sends a query with the current value of the input.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-autoComplete [(ngModel)]="selectedCountry" [dropdown]="true" [suggestions]="filteredCountries" (completeMethod)="filterCountry($event)" field="name"></p-autoComplete>
        </div>
        <app-code [code]="code" selector="autocomplete-dropdown-demo"></app-code>
    </div>`
})
export class DropdownDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    countries: any[];

    selectedCountry: any;

    filteredCountries: any[];

    constructor(private countryService: CountryService) {}

    ngOnInit() {
        this.countryService.getCountries().then((countries) => {
            this.countries = countries;
        });
    }

    filterCountry(event) {
        let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < this.countries.length; i++) {
            let country = this.countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredCountries = filtered;
    }

    code: Code = {
        basic: `
<p-autoComplete [(ngModel)]="selectedCountry" [dropdown]="true" [suggestions]="filteredCountries" (completeMethod)="filterCountry($event)" field="name"></p-autoComplete>`,

        html: `
<div class="card flex justify-content-center">
    <p-autoComplete [(ngModel)]="selectedCountry" [dropdown]="true" [suggestions]="filteredCountries" (completeMethod)="filterCountry($event)" field="name"></p-autoComplete>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/service/countryservice';

@Component({
    selector: 'autocomplete-dropdown-demo',
    templateUrl: './autocomplete-dropdown-demo.html',
    styleUrls: ['./autocomplete-dropdown-demo.scss']
})
export class AutocompleteDropdownDemo implements OnInit {
    countries: any[];

    selectedCountry: any;

    filteredCountries: any[];

    constructor(private countryService: CountryService) {}

    ngOnInit() {
        this.countryService.getCountries().then((countries) => {
            this.countries = countries;
        });
    }

    filterCountry(event) {
        let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < this.countries.length; i++) {
            let country = this.countries[i];
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

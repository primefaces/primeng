import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';
import { CountryService } from '../../service/countryservice';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-multiple-demo',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Multiple mode is enabled using <i>multiple</i> property used to select more than one value from the autocomplete. In this case, value reference should be an array.</p>
        </app-docsectiontext>
        <div class="card">
            <span class="p-fluid">
                <p-autoComplete [(ngModel)]="selectedCountries" [suggestions]="filteredCountries" (completeMethod)="filterCountry($event)" field="name" [multiple]="true"></p-autoComplete>
            </span>
        </div>
        <app-code [code]="code" selector="autocomplete-multiple-demo"></app-code>
    </section>`
})
export class MultipleDoc {
    @Input() id: string;

    @Input() title: string;

    countries: any[] | undefined;

    selectedCountries: any[] | undefined;

    filteredCountries: any[] | undefined;

    constructor(private countryService: CountryService) {}

    ngOnInit() {
        this.countryService.getCountries().then((countries) => {
            this.countries = countries;
        });
    }

    filterCountry(event: AutoCompleteCompleteEvent) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
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
<span class="p-fluid">
    <p-autoComplete [(ngModel)]="selectedCountries" [suggestions]="filteredCountries" 
        (completeMethod)="filterCountry($event)" field="name" [multiple]="true"></p-autoComplete>
</span>`,

        html: `
<div class="card">
    <span class="p-fluid">
        <p-autoComplete [(ngModel)]="selectedCountries" [suggestions]="filteredCountries" (completeMethod)="filterCountry($event)" field="name" [multiple]="true"> </p-autoComplete>
    </span>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { CountryService } from 'src/service/countryservice';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-multiple-demo',
    templateUrl: './autocomplete-multiple-demo.html'
})
export class AutocompleteMultipleDemo {
    countries: any[] | undefined;

    selectedCountries: any[] | undefined;

    filteredCountries: any[] | undefined;

    constructor(private countryService: CountryService) {}

    ngOnInit() {
        this.countryService.getCountries().then((countries) => {
            this.countries = countries;
        });
    }

    filterCountry(event: AutoCompleteCompleteEvent) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
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

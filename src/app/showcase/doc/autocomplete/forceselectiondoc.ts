import { Component, Input, OnInit } from '@angular/core';
import { Code } from '../../domain/code';
import { CountryService } from '../../service/countryservice';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'force-selection-doc',
    template: ` <app-docsectiontext>
            <p>ForceSelection mode validates the manual input to check whether it also exists in the suggestions list, if not the input value is cleared to make sure the value passed to the model is always one of the suggestions.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-autoComplete [(ngModel)]="selectedCountry" [forceSelection]="true" [suggestions]="filteredCountries" (completeMethod)="filterCountry($event)" field="name"></p-autoComplete>
        </div>
        <app-code [code]="code" selector="autocomplete-force-selection-demo"></app-code>`
})
export class ForceSelectionDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    countries: any[] | undefined;

    selectedCountry: any;

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
<p-autoComplete [(ngModel)]="selectedCountry" [forceSelection]="true" [suggestions]="filteredCountries" (completeMethod)="filterCountry($event)" field="name"></p-autoComplete>`,

        html: `
<div class="card flex justify-content-center">
    <p-autoComplete [(ngModel)]="selectedCountry" [forceSelection]="true" [suggestions]="filteredCountries" (completeMethod)="filterCountry($event)" field="name"></p-autoComplete>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/service/countryservice';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-force-selection-demo',
    templateUrl: './autocomplete-force-selection-demo.html'
})
export class ForceSelectionDoc implements OnInit {
    countries: any[] | undefined;

    selectedCountry: any;

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

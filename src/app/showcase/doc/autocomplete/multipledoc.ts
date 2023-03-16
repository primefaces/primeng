import { Component, Input } from '@angular/core';
import { SelectItemGroup } from 'primeng/api';
import { Code } from '../../domain/code';
import { CountryService } from '../../service/countryservice';

@Component({
    selector: 'autocomplete-multiple-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Multiple mode is enabled using <i>multiple</i> property used to select more than one value from the autocomplete. In this case, value reference should be an array.</p>
        </app-docsectiontext>
        <div class="card">
            <span class="p-fluid">
                <p-autoComplete [(ngModel)]="selectedCountries" [suggestions]="filteredCountries" (completeMethod)="filterCountry($event)" field="name" [multiple]="true"> </p-autoComplete>
            </span>
        </div>
        <app-code [code]="code" selector="autocomplete-multiple-demo"></app-code>
    </div>`
})
export class MultipleDoc {
    @Input() id: string;

    @Input() title: string;

    countries: any[];

    items: any[];

    selectedCountries: any[];

    filteredCountries: any[];

    groupedCities: SelectItemGroup[];

    constructor(private countryService: CountryService) {}

    ngOnInit() {
        this.countryService.getCountries().then((countries) => {
            this.countries = countries;
        });

        this.groupedCities = [
            {
                label: 'Germany',
                value: 'de',
                items: [
                    { label: 'Berlin', value: 'Berlin' },
                    { label: 'Frankfurt', value: 'Frankfurt' },
                    { label: 'Hamburg', value: 'Hamburg' },
                    { label: 'Munich', value: 'Munich' }
                ]
            },
            {
                label: 'USA',
                value: 'us',
                items: [
                    { label: 'Chicago', value: 'Chicago' },
                    { label: 'Los Angeles', value: 'Los Angeles' },
                    { label: 'New York', value: 'New York' },
                    { label: 'San Francisco', value: 'San Francisco' }
                ]
            },
            {
                label: 'Japan',
                value: 'jp',
                items: [
                    { label: 'Kyoto', value: 'Kyoto' },
                    { label: 'Osaka', value: 'Osaka' },
                    { label: 'Tokyo', value: 'Tokyo' },
                    { label: 'Yokohama', value: 'Yokohama' }
                ]
            }
        ];

        this.items = [];
        for (let i = 0; i < 10000; i++) {
            this.items.push({ label: 'Item ' + i, value: 'Item ' + i });
        }
    }

    filterCountry(event) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
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
import { SelectItemGroup } from 'primeng/api';
import { Component } from '@angular/core';
import { CountryService } from 'src/service/countryservice';

@Component({
    selector: 'autocomplete-multiple-demo',
    templateUrl: './autocomplete-multiple-demo.html',
    styleUrls: ['./autocomplete-multiple-demo.scss']
})
export class AutocompleteMultipleDemo {
    countries: any[];

    items: any[];

    selectedCountries: any[];

    filteredCountries: any[];

    groupedCities: SelectItemGroup[];

    constructor(private countryService: CountryService) {}

    ngOnInit() {
        this.countryService.getCountries().then((countries) => {
            this.countries = countries;
        });

        this.groupedCities = [
            {
                label: 'Germany',
                value: 'de',
                items: [
                    { label: 'Berlin', value: 'Berlin' },
                    { label: 'Frankfurt', value: 'Frankfurt' },
                    { label: 'Hamburg', value: 'Hamburg' },
                    { label: 'Munich', value: 'Munich' }
                ]
            },
            {
                label: 'USA',
                value: 'us',
                items: [
                    { label: 'Chicago', value: 'Chicago' },
                    { label: 'Los Angeles', value: 'Los Angeles' },
                    { label: 'New York', value: 'New York' },
                    { label: 'San Francisco', value: 'San Francisco' }
                ]
            },
            {
                label: 'Japan',
                value: 'jp',
                items: [
                    { label: 'Kyoto', value: 'Kyoto' },
                    { label: 'Osaka', value: 'Osaka' },
                    { label: 'Tokyo', value: 'Tokyo' },
                    { label: 'Yokohama', value: 'Yokohama' }
                ]
            }
        ];

        this.items = [];
        for (let i = 0; i < 10000; i++) {
            this.items.push({ label: 'Item ' + i, value: 'Item ' + i });
        }
    }

    filterCountry(event) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
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

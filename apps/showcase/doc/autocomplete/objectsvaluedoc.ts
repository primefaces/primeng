import { Code } from '@/domain/code';
import { CountryService } from '@/service/countryservice';
import { Component, OnInit } from '@angular/core';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-objects-with-value-demo',
    standalone: false,
    template: ` <app-docsectiontext>
        <p>
            Another possibility is working with objects but specifying also the value field using the <i>field</i> property that defines the value to use as selected value. The value passed to the model will be a value or an array of values of that
            field type (code in this case).
        </p>

        <div class="card flex flex-col justify-center">
            <label for="countries">Select one or more countries</label>
            <p-autocomplete [(ngModel)]="selectedCountries" [suggestions]="filteredCountries" [multiple]="true" optionLabel="name" optionValue="code" inputId="countries" (completeMethod)="filterCountry($event)" />
        </div>

        <div class="card flex flex-col justify-center">
            <label>Selection is:</label>
            <pre>
                {{ selectedCountries | json }}
            </pre
            >
        </div>
        <app-code [code]="code" selector="autocomplete-objects-with-value-demo"></app-code
    ></app-docsectiontext>`
})
export class ObjectsValueDoc implements OnInit {
    countries: any[] | undefined;

    selectedCountry: any;

    selectedCountries: any[] = ['AL', 'US', 'RO'];

    filteredCountries: any[] | undefined;

    useOptionValue: boolean = true;

    constructor(private countryService: CountryService) {}

    ngOnInit() {
        this.countryService.getCountries().then((countries) => {
            this.countries = countries;
            this.filteredCountries = countries.filter((country) => {
                return this.selectedCountries.includes(country.code);
            });
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
        basic: `<p-autocomplete [(ngModel)]="selectedCountries" [suggestions]="filteredCountries" [multiple]="true" optionLabel="name" optionValue="code" inputId="countries" (completeMethod)="filterCountry($event)" optionLabel="name" />`,

        html: `<div class="card flex justify-center">
    <p-autocomplete [(ngModel)]="selectedCountries" [suggestions]="filteredCountries" [multiple]="true" optionLabel="name" optionValue="code" inputId="countries" (completeMethod)="filterCountry($event)" optionLabel="name" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { CountryService } from '@/service/countryservice';
import { AutoComplete } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-objects-demo',
    templateUrl: './autocomplete-objects-demo.html',
    standalone: true,
    imports: [AutoComplete, FormsModule],
    providers: [CountryService]

})
export class AutocompleteObjectsDemo implements OnInit {
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

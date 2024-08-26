import { Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';
import { CountryService } from '@service/countryservice';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-objects-demo',
    template: ` <app-docsectiontext>
            <p>
                AutoComplete can also work with objects using the <i>field</i> property that defines the label to display as a suggestion. The value passed to the model would still be the object instance of a suggestion. Here is an example with a
                Country object that has name and code fields such as <i>&#123;name: "United States", code:"USA"&#125;</i>.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-autoComplete [(ngModel)]="selectedCountry" placeholder="Search" [suggestions]="filteredCountries" (completeMethod)="filterCountry($event)" field="name" />
        </div>
        <app-code [code]="code" selector="autocomplete-objects-demo"></app-code>`
})
export class ObjectsDoc implements OnInit {
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
        basic: `<p-autoComplete 
    [(ngModel)]="selectedCountry" 
    [suggestions]="filteredCountries" 
    (completeMethod)="filterCountry($event)" 
    field="name" />`,

        html: `<div class="card flex justify-center">
    <p-autoComplete 
        [(ngModel)]="selectedCountry" 
        [suggestions]="filteredCountries" 
        (completeMethod)="filterCountry($event)" 
        field="name" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { CountryService } from '@service/countryservice';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-objects-demo',
    templateUrl: './autocomplete-objects-demo.html',
    standalone: true,
    imports: [AutoCompleteModule, FormsModule],
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

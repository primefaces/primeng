import { Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';
import { CountryService } from '@service/countryservice';
import { PlatformService } from '@service/platformservice';
import { FormControl, FormGroup } from '@angular/forms';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-show-clear-demo',
    template: `
        <app-docsectiontext>
            <p>When <i>showClear</i> is enabled, a clear icon is added to reset the Autocomplete.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center" [formGroup]="countryFormGroup">
            <p-autoComplete formControlName="country" [dropdown]="true" [showClear]="true" placeholder="Search" [suggestions]="filteredCountries" (completeMethod)="filterCountry($event)" optionLabel="name" />
        </div>
        <app-code [code]="code" selector="autocomplete-show-clear-demo"></app-code>
    `
})
export class ShowClearDoc implements OnInit {
    countries: any[] | undefined;

    countryFormGroup: FormGroup = new FormGroup({ country: new FormControl({ name: 'Switzerland', code: 'CH' }) });

    filteredCountries: any[] | undefined;

    constructor(
        private countryService: CountryService,
        private PlatformService: PlatformService
    ) {}

    ngOnInit() {
        if (this.PlatformService.isBrowser()) {
            this.countryService.getCountries().then((countries) => {
                this.countries = countries;
            });
        }
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
    formControlName="country"
    [dropdown]="true"
    [showClear]="true"
    [suggestions]="filteredCountries"
    (completeMethod)="filterCountry($event)"
    optionLabel="name" />`,

        html: `<div class="card flex justify-content-center" [formGroup]="countryFormGroup">
    <p-autoComplete
        formControlName="country"
        [dropdown]="true"
        [showClear]="true"
        [suggestions]="filteredCountries"
        (completeMethod)="filterCountry($event)"
        optionLabel="name" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { CountryService } from '@service/countryservice';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormControl, FormGroup } from '@angular/forms';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-show-clear-demo',
    templateUrl: './autocomplete-show-clear-demo.html',
    standalone:true,
    imports: [FormsModule, AutoCompleteModule],
    providers:[CountryService]
})
export class AutocompleteShowClearDemo implements OnInit {
    countries: any[] | undefined;

    countryFormGroup: FormGroup = new FormGroup({ 'country': new FormControl({ name: 'Switzerland', code: 'CH' }) });

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

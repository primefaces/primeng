import { Component, Input, OnInit } from '@angular/core';
import { Code } from '../../domain/code';
import { CountryService } from '../../service/countryservice';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
    selector: 'reactive-forms-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>AutoComplete can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <form [formGroup]="formGroup">
                <p-autoComplete formControlName="selectedCountry" [suggestions]="filteredCountries" (completeMethod)="filterCountry($event)" field="name"></p-autoComplete>
            </form>
        </div>
        <app-code [code]="code" selector="autocomplete-reactive-forms-demo"></app-code>
    </section>`
})
export class ReactiveFormsDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    countries: any[];

    formGroup: FormGroup;

    filteredCountries: any[];

    constructor(private countryService: CountryService) {}

    ngOnInit() {
        this.countryService.getCountries().then((countries) => {
            this.countries = countries;
        });

        this.formGroup = new FormGroup({
            selectedCountry: new FormControl<object | null>(null)
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
<form [formGroup]="formGroup">
    <p-autoComplete formControlName="selectedCountry" [suggestions]="filteredCountries" (completeMethod)="filterCountry($event)" field="name"></p-autoComplete>
</form>`,

        html: `
<div class="card flex justify-content-center">
    <form [formGroup]="formGroup">
        <p-autoComplete formControlName="selectedCountry" [suggestions]="filteredCountries" (completeMethod)="filterCountry($event)" field="name"></p-autoComplete>
    </form>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../service/countryservice';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'autocomplete-reactive-forms-demo',
    templateUrl: './autocomplete-reactive-forms-demo.html'
})
export class AutocompleteReactiveFormsDemo implements OnInit {
    countries: any[];

    formGroup: FormGroup;

    filteredCountries: any[];

    constructor(private countryService: CountryService) {}

    ngOnInit() {
        this.countryService.getCountries().then((countries) => {
            this.countries = countries;
        });

        this.formGroup = new FormGroup({
            selectedCountry: new FormControl<object | null>(null)
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

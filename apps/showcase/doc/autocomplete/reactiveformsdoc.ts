import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'reactive-forms-doc',
    template: ` <app-docsectiontext>
            <p>AutoComplete can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <form [formGroup]="formGroup">
                <p-autocomplete formControlName="selectedCountry" [suggestions]="items" (completeMethod)="search($event)" />
            </form>
        </div>
        <app-code [code]="code" selector="autocomplete-reactive-forms-demo"></app-code>`
})
export class ReactiveFormsDoc {
    items: any[] | undefined;

    formGroup: FormGroup | undefined;
    code: Code = {
        basic: `<form [formGroup]="formGroup">
    <p-autocomplete formControlName="selectedCountry" [suggestions]="filteredCountries" (completeMethod)="filterCountry($event)" field="name" />
</form>`,

        html: `<div class="card flex justify-center">
    <form [formGroup]="formGroup">
        <p-autocomplete formControlName="selectedCountry" [suggestions]="filteredCountries" (completeMethod)="filterCountry($event)" field="name" />
    </form>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { CountryService } from '@/service/countryservice';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AutoComplete } from 'primeng/autocomplete';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-reactive-forms-demo',
    templateUrl: './autocomplete-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, AutoComplete],
    providers: [CountryService]
})
export class AutocompleteReactiveFormsDemo implements OnInit {
    items: any[] | undefined;

    formGroup: FormGroup | undefined;

    search(event: AutoCompleteCompleteEvent) {
        this.items = [...Array(10).keys()].map((item) => event.query + '-' + item);
    }

    ngOnInit() {
        this.formGroup = new FormGroup({
            selectedCountry: new FormControl(undefined),
        });
    }
}`
    };

    search(event: AutoCompleteCompleteEvent) {
        this.items = [...Array(10).keys()].map((item) => event.query + '-' + item);
    }

    ngOnInit() {
        this.formGroup = new FormGroup({
            selectedCountry: new FormControl(undefined)
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Code } from '../../domain/code';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'reactive-forms-doc',
    template: `
        <app-docsectiontext>
            <p>Dropdown can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <form [formGroup]="formGroup">
                <p-dropdown formControlName="selectedCity" [options]="cities" optionLabel="name" placeholder="Select a City"></p-dropdown>
            </form>
        </div>
        <app-code [code]="code" selector="dropdown-reactive-forms-demo"></app-code>
    `
})
export class ReactiveFormsDoc implements OnInit {

    cities: City[] | undefined;

    formGroup: FormGroup | undefined;

    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];

        this.formGroup = new FormGroup({
            selectedCity: new FormControl<City | null>(null)
        });
    }

    code: Code = {
        basic: `
<form [formGroup]="formGroup">
    <p-dropdown formControlName="selectedCity" [options]="cities" optionLabel="name" placeholder="Select a City"></p-dropdown>
</form>`,

        html: `
<div class="card flex justify-content-center">
    <form [formGroup]="formGroup">
        <p-dropdown formControlName="selectedCity" [options]="cities" optionLabel="name" placeholder="Select a City"></p-dropdown>
    </form>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'dropdown-reactive-forms-demo',
    templateUrl: './dropdown-reactive-forms-demo.html'
})
export class DropdownReactiveFormsDemo implements OnInit {
    cities: City[] | undefined;
    
    formGroup: FormGroup | undefined;

    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];

        this.formGroup = new FormGroup({
            selectedCity: new FormControl<City | null>(null)
        });
    }
}`
    };
}

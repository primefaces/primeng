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
            <p>Listbox can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <form [formGroup]="formGroup">
                <p-listbox [options]="cities" formControlName="selectedCity" optionLabel="name" [style]="{ width: '15rem' }" [listStyle]="{ 'max-height': '220px' }"></p-listbox>
            </form>
        </div>
        <app-code [code]="code" selector="listbox-reactive-forms-demo"></app-code>
    `
})
export class ReactiveFormsDoc implements OnInit {
    cities!: City[];

    formGroup!: FormGroup;

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
        basic: `<form [formGroup]="formGroup">
    <p-listbox [options]="cities" formControlName="selectedCity" optionLabel="name" [style]="{ width: '15rem' }" [listStyle]="{'max-height': '220px'}"></p-listbox>
</form>`,

        html: `
<div class="card flex justify-content-center">
    <form [formGroup]="formGroup">
        <p-listbox [options]="cities" formControlName="selectedCity" optionLabel="name" [style]="{ width: '15rem' }" [listStyle]="{'max-height': '220px'}"></p-listbox>
    </form>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'listbox-reactive-forms-demo',
    templateUrl: './listbox-reactive-forms-demo.html'
})
export class ListboxReactiveFormsDemo implements OnInit {
    cities!: City[];

    formGroup!: FormGroup;

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

import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Code } from '../../domain/code';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'reactive-forms-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>MultiSelect can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <form [formGroup]="formGroup">
                <p-multiSelect [options]="cities" formControlName="selectedCities" optionLabel="name"></p-multiSelect>
            </form>
        </div>
        <app-code [code]="code" selector="multi-select-reactive-forms-demo"></app-code>
    </section>`
})
export class ReactiveFormsDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

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
            selectedCities: new FormControl<City[] | null>(null)
        });
    }

    code: Code = {
        basic: `
<form [formGroup]="formGroup">
    <p-multiSelect [options]="cities" formControlName="selectedCities" optionLabel="name"></p-multiSelect>
</form>`,

        html: `
<div class="card flex justify-content-center">
    <form [formGroup]="formGroup">
        <p-multiSelect [options]="cities" formControlName="selectedCities" optionLabel="name"></p-multiSelect>
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
    selector: 'multi-select-reactive-forms-demo',
    templateUrl: './multi-select-reactive-forms-demo.html'
})
export class MultiSelectReactiveFormsDemo implements OnInit {
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
            selectedCities: new FormControl<City[] | null>(null)
        });
    }  
}`
    };
}

import { Component, Input, OnInit } from '@angular/core';
import { Code } from '../../domain/code';
import { FormGroup, FormControl } from '@angular/forms';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'basic-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                MultiSelect is used as a controlled component with <i>ngModel</i> property along with an <i>options</i> collection. Label and value of an option are defined with the <i>optionLabel</i> and <i>optionValue</i> properties respectively.
                Default property name for the <i>optionLabel</i> is <i>label</i> and <i>value</i> for the <i>optionValue</i>. If <i>optionValue</i> is omitted and the object has no <i>value</i> property, the object itself becomes the value of an
                option. Note that, when options are simple primitive values such as a string array, no <i>optionLabel</i> and <i>optionValue</i> would be necessary.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-multiSelect [options]="cities" [(ngModel)]="selectedCities" optionLabel="name" [showClear]="true" placeholder="Select Cities"></p-multiSelect>
        </div>
        <app-code [code]="code" selector="multi-select-basic-demo"></app-code>
    </section>`
})
export class BasicDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    cities!: City[];

    selectedCities!: City[];

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
<p-multiSelect [options]="cities" [(ngModel)]="selectedCities" optionLabel="name"></p-multiSelect>`,

        html: `
<div class="card flex justify-content-center">
    <p-multiSelect [options]="cities" [(ngModel)]="selectedCities" optionLabel="name"></p-multiSelect>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'multi-select-basic-demo',
    templateUrl: './multi-select-basic-demo.html'
})
export class MultiSelectBasicDemo implements OnInit {

    cities!: City[];

    selectedCities!: City[];

    ngOnInit() {
        this.cities = [
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'}
        ];
    }
}`
    };
}
